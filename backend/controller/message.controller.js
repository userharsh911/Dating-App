import MessageSchema from "../models/message.model.js";
import userSchema from "../models/user.model.js";
import { io, getSocketId } from "../socket/socketio.js";
export const addToMessageList = async(req,res)=>{
    const user = req.user;
    const otherUser = req.query.otherUser;
    try {
        const messageToUser = await userSchema.findById(otherUser);
        if(messageToUser.messageList.includes(user._id) || user.messageList.includes(messageToUser._id)){
            console.log("already in message lsit ")
            return res.status(200).json({message:'already in Message List'});
        }
        messageToUser.messageList.push(user._id)
        const updatedMessageToUser = await messageToUser.save();

        user.messageList.push(messageToUser._id);
        const updatedUser = await user.save();

        return res.status(201).json({message:"successfully added to message list"},updatedUser);
    } catch (error) {
        console.log("error while message to ",error)
    }
}

export const getMessageUsers = async(req,res)=>{
    const user = req.user;
    try {
        const users = await userSchema.find({
            _id:{$in:user.messageList}
        }).select("-password")
        if(!users){
            return res.status(401).json({message:"users not present for messsage"});
        }
        
        return res.status(200).json({message:"successfully getted",users});

    } catch (error) {
        throw error.errResponse;
    }
}

export const createMessage = async(req,res)=>{
    const user = req.user;
    const {message} = req.body;
    const receiverId = req.query.userid;
    try {
        const newMessage = new MessageSchema({
            senderId:user._id,
            receiverId:receiverId,
            text:message,
        });

        const messageCreated = await newMessage.save();
        if(!messageCreated){
            return res.status(401).json({message:"Error: Try again"});
        }
        
        console.log("new message created successfully ",messageCreated);
        const receiverSocketId = getSocketId(receiverId);
        console.log("chl rh h h  hj")
        io.to(receiverSocketId).emit("sendmessage",{msg:messageCreated,user});

        return res.status(201).json({message:"successfully message sent",msg:messageCreated});

    } catch (error) {
        console.log("error while creating message ",error);
    }
}

export const getAllMessages = async(req,res)=>{
    const user = req.user;
    const receiverId = req.query.userid
    try {
        console.log("receiver id h ",receiverId)
        const messages = await MessageSchema.find({
            $or:[{
                senderId:user._id,
                receiverId:receiverId
            },{
                senderId:receiverId,
                receiverId:user._id
            }]
        });
        if(!messages){
            return res.status(401).json({message:"Error: Try again"});
        }
        console.log("get messages ",messages)
        return res.status(200).json({message:"successfully get",messages})
    } catch (error) {
        console.log("error while fetching messages ",error);
    }
} 