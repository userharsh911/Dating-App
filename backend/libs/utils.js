import jwt from "jsonwebtoken";

const createJSONwebToken = (userid,res)=>{
    const token = jwt.sign({userid},process.env.JWT_SECRET_KEY,{ expiresIn: '48h' });
    res.cookie("useridToken",token,{
        maxAge: 172800000,
        httpOnly:"secure",
        secure : process.env.SECURE != "DEVELOPMENT",
        sameSite: "strict"
    });
}

export default createJSONwebToken;
