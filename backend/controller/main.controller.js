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
        return res.status(200).json({message:"success",users})
    } catch (error) {
        throw res.status(402).json({message:error.errorResponse})
    }
}
export const updateProfilePic = async(req,res)=>{
    try {
        const user = req.user;
        const {imageLink} = req.body;
        if(user?.profilePublicId){
            await cloudinary.uploader.destroy(user?.profilePublicId);
        }
        const uploadResult = await cloudinary.uploader.upload(imageLink);
        const UpdatedUser = await userSchema.findOneAndUpdate({_id:user._id},{profilePicLink:uploadResult.secure_url,profilePublicId:uploadResult.public_id},{new:true})
        console.log("Image upload result ", uploadResult,UpdatedUser);
        return res.status(200).json({message:"success",UpdatedUser})

    } catch (error) {
        console.log(error)
        throw res.status(404).json({message:error.errorResponse})
    }
}
export const editProfile = async(req,res)=>{
    const user = req.user;
    const data = req.body;
    try {
        const updatedUser = await userSchema.findOneAndUpdate({_id:user._id},data,{new:true});
        if(!updatedUser){
            return res.status(402).json({message:"Error while updating: Try again"})
        }
        console.log("updated user after update ",updatedUser);
        return res.status(200).json({message:"successfully updated",updatedUser});
    } catch (error) {
        console.log("error while updating ",error);
        throw res.status(401).json({message:error.errorResponse});
    }
}