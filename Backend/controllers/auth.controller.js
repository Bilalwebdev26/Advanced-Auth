import crypto from "crypto";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from "bcryptjs";
import { generateTokenandSetCookie } from "../utils/generatetokenandsetcookie.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  sendResetMail,
  sendResetPassword,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  //   console.log("Email",email)
  //   console.log("pass",password)
  //   console.log("name",name)
  try {
    if (!name || !email || !password) {
      throw new ApiError(400, "All fields are empty");
    }
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      throw new ApiError(400, "User already Exist");
    }
    //Now hash password
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = new User({
      email,
      password: hashPassword,
      name,
      verificationToken: verificationCode,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24hours
    });
    await user.save();
    await sendVerificationEmail(user.email, verificationCode);
    const usercreate = await User.findById(user._id).select(
      "-verificationToken -password"
    );
    //jwt
    generateTokenandSetCookie(res, user._id);
    return res
      .status(201)
      .json(
        new ApiResponse(200, "User Created Successfully", usercreate, true)
      );
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
export const verifyEmail = async (req, res) => {
  //123456
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      throw new ApiError(400, "Invalid or expired Verification Token");
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    const createuser = await user.save();
    await sendWelcomeEmail(user.email, user.name);
    return res
      .status(200)
      .json(
        new ApiResponse(201, "Verify user email successfully", createuser, true)
      );
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const logout = async (req, res) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json(new ApiResponse(200, "User Logout Successfully", {}, true));
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new ApiError(400, "All field are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "User not Exist with this Email");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid Credentails");
    }
    generateTokenandSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();
    const createduser = await User.findById(user._id).select("-password");

    return res
      .status(201)
      .json(
        new ApiResponse(201, "User Signup Successfully", createduser, true)
      );
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "User not exist with this email");
    }
    //generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiry;
    await user.save();
    //send email
    await sendResetPassword(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
    return res
      .status(200)
      .json(new ApiResponse(201, "Password Reset link sent ", {}, true));
  } catch (error) {
    console.log("Error in forgot password", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      throw new ApiError(400, "Invalid or expired reset token");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    //send mail
    await sendResetMail(user.email);
    return res
      .status(201)
      .json(new ApiResponse(200, "Reset Password Successfully", {}, true));
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req?.userId).select("-password");
    if (!user) {
      throw new ApiError(400, "User not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "User Authenticate", user, true));
  } catch (error) {
    console.log(`Error in CheckAuth : ${error}`);
    return res.status(400).json({ success: false, message: error.message });
  }
};
