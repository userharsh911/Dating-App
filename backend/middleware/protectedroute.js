import jwt from "jsonwebtoken"
import userSchema from "../models/user.model.js";
const protectedRoute = async(req,res,next)=>{
    try {
        const token = req.cookies.useridToken;

        console.log("message ",req.cookies)
        if(!token){
            return res.status(401).json({message:"Unauthorized: Invalid token"});
        }
        const verifiedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!verifiedToken){
            return res.status(401).json({message:"Unauthorized: Invalid token"});
        }
        console.log(verifiedToken);
        const user = await userSchema.findById(verifiedToken.userid)
        if(!user){
            return res.status(401).json({message:"Unauthorized: user not found"});
        }
        req.user = user;
        next();

    } catch (error) {
        console.log("error while authenticating",error)
        throw res.status(401).json({message:error.errorResponse})
    }

}

export default protectedRoute;