import express from "express"
import {blockedPerson, editDescription, editHobby, editProfile, getAllUsers, unblockedPerson, updateProfilePic } from "../controller/main.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";
const mainRouter = express();
mainRouter.get("/getallusers",protectedRoute,getAllUsers);
mainRouter.post("/updateprofilepic",protectedRoute,updateProfilePic);
mainRouter.put("/editprofile",protectedRoute,editProfile);
mainRouter.put("/edithobby",protectedRoute,editHobby);
mainRouter.put("/editdescription",protectedRoute,editDescription);
mainRouter.put("/blockperson",protectedRoute,blockedPerson);
mainRouter.put("/unblockperson",protectedRoute,unblockedPerson);
export default mainRouter;