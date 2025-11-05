import express from "express";
import { loginRouter, signUpRouter, logoutRouter } from "../controller/auth.controller.js";
const authRouter = express.Router();
authRouter.post("/signup",signUpRouter);
authRouter.post("/login",loginRouter);
authRouter.post("/logout",logoutRouter);


export default authRouter;