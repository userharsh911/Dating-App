import userSchema from "../models/user.model.js"
import cloudinary from "../libs/cloudinary.js";
export const getAllUsers = async(req,res)=>{
    const user = req.user; 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const actualLimit = page*limit
    try {
        const totalUsers = await userSchema.countDocuments({
        _id: { $ne: user._id }
        });

        const users = await userSchema.find({
            _id:{$ne:user._id}
        }).limit(actualLimit).select('-password')

        const hasMore = users.length < totalUsers;
        console.log("HasMore ",page,Math.ceil(totalUsers / limit));
        return res.status(200).json({
            message:"success",
            users,
            pagination: {
                currentPage: page,
                limit,
                totalUsers,
                totalPages: Math.ceil(totalUsers / limit),
                hasMore
            }
        })
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

export const editHobby = async(req,res)=>{
    const user = req.user;
    const {hobby,id} = req.body;
    console.log("for hobby")
    try {
        const editUser = await userSchema.findById(user._id);
        if(!editUser){
            return res.status(401).json({message:"Inlvalid requests"});
        }
        let updatedUser;
        if(id || id===0){
            editUser.hobbies.splice(id,1);
            updatedUser = await editUser.save();
        }else{
            editUser.hobbies.push(hobby);
            updatedUser = await editUser.save();
        }

        if(!updatedUser){
            return res.status(402).json({message:"error while adding hobby"});
        }
        console.log("user for hobby updated",updatedUser);
        return res.status(200).json({message:"successfully added", updatedUser});
        
    } catch (error) {
        console.log("error while add hobbies",error)
        throw error.errorResponse;
    }
}

export const editDescription = async(req,res)=>{
    const user = req.user;
    const {description} = req.body;
    try {
        const updatedUser = await userSchema.findOneAndUpdate({_id:user._id},{description},{new:true});
        if(!updatedUser){
            return res.status(402).json({message:"error while updating: try again "})
        }
        console.log("updated descrition user ",updatedUser);
        return res.status(200).json({message:"successfully updated",updatedUser});
    } catch (error) {
        console.log("error while updating description ",error);
        throw error.errorResponse;
    }
}