import jwt from "jsonwebtoken";
export const generateTokenandSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true, //can not accessed by js
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //Prevent crsf attack
    maxAge: 7 * 24 * 24 * 60 * 1000,
  });
  return token;
};
