import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId
    },
    text:{
        type:String
    },
    image:{
        type:String
    },
    imageId:{
        type:String
    }
},{timestamps:true})

export default mongoose.model("MessageSchema",messageSchema);