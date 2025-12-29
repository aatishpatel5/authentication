import express from "express";
import dotenv from "dotenv";
dotenv.config();
import DBConnect from "./config/database.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import cors from "cors"
import userRouter from "./routes/userRoutes.js";

const app = express();
app.set("trust proxy", 1);
const port = process.env.PORT || 5000

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter) 
app.use("/api/user", userRouter)

app.listen(port, ()=> {
    DBConnect()
    console.log(`server started at ${port}`)
})





