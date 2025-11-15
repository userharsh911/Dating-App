import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors"
import authRouter from '../routes/auth.routes.js';
import cookieParser from "cookie-parser"
import mainRouter from '../routes/mainRouter.routes.js';
import messageRouter from '../routes/message.routes.js';
// import mainRouter from '../routes/mainRouter.routes.js';
import { server, app } from '../socket/socketio.js';
import path from "path"
dotenv.config();

// const app = express();
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
app.use("/api/message",messageRouter)


if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

mongoose.connect(process.env.MONGO_URI).then(()=>{
    server.listen(PORT,()=>{
        console.log(`The server is running on port ${PORT}`)
    })
    server.keepAliveTimeout = 120 * 1000;
    server.headersTimeout = 120 * 1000;
})

