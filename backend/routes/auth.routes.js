import express from "express";
import { loginRouter, signUpRouter, logoutRouter, checkAuth} from "../controller/auth.controller.js";
import protectedRoute from "../middleware/protectedRoute.js"
const authRouter = express.Router();
authRouter.post("/signup",signUpRouter);
authRouter.post("/login",loginRouter);
authRouter.post("/logout",logoutRouter);
authRouter.get("/checkauth",protectedRoute,checkAuth);


export default authRouter;