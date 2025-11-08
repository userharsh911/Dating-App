import express from "express"
import { editProfile, getAllUsers, updateProfilePic } from "../controller/main.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";
const mainRouter = express();
mainRouter.get("/getallusers",protectedRoute,getAllUsers);
mainRouter.post("/updateprofilepic",protectedRoute,updateProfilePic);
mainRouter.put("/editprofile",protectedRoute,editProfile);
export default mainRouter;