import express from "express"
import dotenv from "dotenv"
const app = express()
import { connectDB } from "./DB/connectDB.js"
dotenv.config()

app.get("/",(req,res)=>{
    res.send("Bilal")
})

app.use("/api/auth",(req,res)=>{
    
})

app.listen(3000,()=>{
    connectDB()
    console.log("Server is running on port 3000")
})
// UserName : rapidapi9898
// Password : gitjKbv5rYIP1A49
// mongodb+srv://rapidapi9898:gitjKbv5rYIP1A49@cluster0.iqau4.mongodb.net/