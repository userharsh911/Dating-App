import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors"
import authRouter from '../routes/auth.routes.js';
import cookieParser from "cookie-parser"
import mainRouter from '../routes/mainRouter.routes.js';
// import mainRouter from '../routes/mainRouter.routes.js';
dotenv.config();

const app = express();
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    method:["get","post","put","delete"],
    credentials:true,
}

app.use(cors(corsOptions))
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

const PORT = process.env.PORT || 5000;

// app.use("/api",authRouter);
app.use("/api/auth",authRouter);
app.use("/api/main",mainRouter)


mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(PORT,()=>{
        console.log(`The server is running on port ${PORT}`)
    })
})

