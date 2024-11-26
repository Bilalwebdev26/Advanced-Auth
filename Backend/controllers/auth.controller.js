import express from "express";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from "bcryptjs"
import { generateTokenandSetCookie } from "../utils/generatetokenandsetcookie.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const signup = async (req, res) => {
  const{email,password,name} = req.body
//   console.log("Email",email)
//   console.log("pass",password)
//   console.log("name",name)
  try {
    if(!name || !email || !password){
        throw new ApiError(400,"All fields are empty")
    }
    const userAlreadyExist = await User.findOne({email})
    if(userAlreadyExist){
       throw new ApiError(400,"User already Exist")
    }
    //Now hash password
    const saltRounds = 10
    const hashPassword = await bcrypt.hash(password,saltRounds) 
    const verificationCode = Math.floor(1000000 + Math.random() * 9000000 ).toString()
    const user = new User({
        email,
        password:hashPassword,
        name,
        verificationToken:verificationCode,
        verificationTokenExpiresAt:Date.now() + 24 * 60 * 60 * 1000 //24hours
    })
    await user.save()
    const usercreate = await User.findById(user._id).select("-verificationToken -password")
    //jwt
    generateTokenandSetCookie(res,user._id)
    return res.status(201).json(new ApiResponse(200,"User Created Successfully",usercreate,true))

  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
