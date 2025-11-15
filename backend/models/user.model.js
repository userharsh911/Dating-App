import mongoose from "mongoose";

const UserSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    hobbies:[{
        type:String
    }],
    messageList:[{
        type:mongoose.Schema.Types.ObjectId
    }],
    height:{
        type:String
    },
    location:{
        type:String
    },
    branch:{
        type:String
    },
    photos:[{
        url:{
            type:String
        },
        id:{
           type:String 
        }
    }],
    profilePicLink:{
        type:String
    },
    profilePublicId:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    blockList:[{
        type:String,
    }],
    approvePerson:{
        type:mongoose.Schema.Types.ObjectId,
    },
    description:{
        type:String
    },

    


},{timestamps:true})


export default mongoose.model('userSchema', UserSchema);