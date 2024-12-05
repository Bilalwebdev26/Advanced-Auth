import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()
import { connectDB } from "./DB/connectDB.js"
import authRoutes from "../Backend/routes/auth.routes.js"
dotenv.config()

app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())//allow us to parse incoming request : req.body
app.use(cookieParser())//allow to parse incoming cookies

app.use("/api/auth",authRoutes)

app.listen(process.env.PORT || 3000,()=>{
    connectDB()
    console.log("Server is running on port 3000")
})
// UserName : rapidapi9898
// Password : gitjKbv5rYIP1A49
// mongodb+srv://rapidapi9898:gitjKbv5rYIP1A49@cluster0.iqau4.mongodb.net/