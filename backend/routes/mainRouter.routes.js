import express from "express"
import {editDescription, editHobby, editProfile, getAllUsers, updateProfilePic } from "../controller/main.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";
const mainRouter = express();
mainRouter.get("/getallusers",protectedRoute,getAllUsers);
mainRouter.post("/updateprofilepic",protectedRoute,updateProfilePic);
mainRouter.put("/editprofile",protectedRoute,editProfile);
mainRouter.put("/edithobby",protectedRoute,editHobby);
mainRouter.put("/editdescription",protectedRoute,editDescription);
export default mainRouter;