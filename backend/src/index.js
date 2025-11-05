import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors"
import authRouter from '../routes/auth.routes.js';
import cookieParser from "cookie-parser"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin:'*',
    method:["get","post","put","delete"]
}

app.use(cors(corsOptions))

const PORT = process.env.PORT || 5000;

// app.use("/api",authRouter);
app.use("/api/auth",authRouter);


mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(PORT,()=>{
        console.log(`The server is running on port ${PORT}`)
    })
})

