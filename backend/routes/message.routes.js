import express from "express"
import protectedRoute from "../middleware/protectedRoute.js"
import { addToMessageList, createMessage, getAllMessages, getMessageUsers } from "../controller/message.controller.js";
const messageRouter = express.Router()

messageRouter.put('/addtomessagelist',protectedRoute,addToMessageList);
messageRouter.get('/getmessageusers',protectedRoute,getMessageUsers);
messageRouter.post('/sendmessage',protectedRoute,createMessage);
messageRouter.get('/getAllMessages',protectedRoute,getAllMessages);

export default messageRouter;