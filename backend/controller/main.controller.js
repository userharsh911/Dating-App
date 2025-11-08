import userSchema from "../models/user.model.js"
import cloudinary from "../libs/cloudinary.js";
export const getAllUsers = async(req,res)=>{
    const user = req.user
    try {
        const users = await userSchema.find(
            {
                _id:{
                    $ne:user._id
                }
            }
        );
        console.log("all users : ",users);
        return res.status(200).json({message:"successed",users})
    } catch (error) {
        throw res.status(402).json({message:"Try again"})
    }
}
export const updateProfilePic = async(req,res)=>{
    try {
        const user = req.user;
        console.log("user ",user)
        const {imageLink} = req.body;
        console.log("Image links : ")
        const uploadResult = await cloudinary.uploader.upload(imageLink);
        const UpdatedUser = await userSchema.findOneAndUpdate({_id:user._id},{profilePicLink:uploadResult.secure_url,profilePublicId:uploadResult.public_id},{new:true})
        console.log("Image upload result ", uploadResult,UpdatedUser);
        // user.

    } catch (error) {
        console.log(error)
        throw res.status(404).json({message:"Try again : Image uploadation error"})
    }
}