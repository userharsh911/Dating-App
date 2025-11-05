import jwt from "jsonwebtoken"

const protectedRoute = async(req,res,next)=>{
    try {
        const token = req.cookies.useridToken;
        if(!token){
            return res.status(401).json({message:"Unauthorized: Invalid token"});
        }
        const verifiedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!verifiedToken){
            return res.status(401).json({message:"Unauthorized: Invalid token"});
        }
        console.log(verifiedToken);
        

    } catch (error) {
        console.log("error while authenticating",error)
    }

}

