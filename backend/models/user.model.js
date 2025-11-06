import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
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
    approveList:[{
        type:String,
    }],
    description:{
        type:String
    },
    


},{timestamps:true})


export default mongoose.model('userSchema', UserSchema);