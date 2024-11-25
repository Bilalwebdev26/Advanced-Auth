import mongoose from "mongoose";

export const connectDB = async()=>{
  try {
    console.log(`MONGODB_URI : ${process.env.MONGODB_URI}`)
    const connect = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MongoDB connected : ${connect.connection.host}`)
  } catch (error) {
    console.log(`Error while connect DB : ${error}`)
    process.exit(1)// 1-failure : 0-Success
  }
}