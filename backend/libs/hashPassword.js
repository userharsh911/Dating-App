import bcrypt from "bcryptjs";

export const hashedPassword = async(password,res)=>{
    const salt = await bcrypt.genSalt(10);
    const hashed_pass = await bcrypt.hash(password,salt);
    if(!hashed_pass){
        return res.status(404).json({message:"error something went wrong try again"});
    }
    return hashed_pass;
}

export const comparePassword = async(password,hash_password)=>{
    try {
        return await bcrypt.compare(password,hash_password)
    } catch (error) {
        console.log("internal error");
    }
}
