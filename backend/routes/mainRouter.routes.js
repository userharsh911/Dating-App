import express from "express"
import { getAllUsers, updateProfilePic } from "../controller/main.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";
const mainRouter = express();
mainRouter.get("/getallusers",protectedRoute,getAllUsers);
mainRouter.post("/updateprofilepic",protectedRoute,updateProfilePic)
export default mainRouter;