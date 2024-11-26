import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async()=>{
  try {
    console.log(`MONGODB_URI : ${process.env.MONGODB_URI}`)
    const connect = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log("DB : ",`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`MongoDB connected : ${connect.connection.host}`)
  } catch (error) {
    console.log(`Error while connect DB : ${error}`)
    process.exit(1)// 1-failure : 0-Success
  }
}