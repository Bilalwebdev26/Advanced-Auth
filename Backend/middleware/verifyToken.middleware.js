import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

export const verifyJWT = async(req,res,next)=>{
    const token = req.cookies.token
    try {
        if(!token){
            throw new ApiError(401,"Unauthorized - no token provide")
        }
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        if(!decodedToken){
            throw new ApiError(401,"Unauthorized - Invalid Token")
        }
        req.userId = decodedToken.userId
        next()
    } catch (error) {
        console.log(`Error in verify token : ${error}`)
        return res.status(500).json({success:false,message:"Server Error"})
    }
}