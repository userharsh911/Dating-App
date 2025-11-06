import express from "express";
import {comparePassword, hashedPassword} from "../libs/hashPassword.js";
import createJSONwebToken from "../libs/utils.js"
import userSchema from "../models/user.model.js";

export const signUpRouter = async(req,res)=>{
    try {
        const {name, email, password, gender,} = req.body;
        if(!name || !email || !password){
            return res.status(402).json({message:"credentials are not provided"});
        }
        const hashed_pass = await hashedPassword(password,res);
        
        const user = new userSchema({
            name,password:hashed_pass,email,gender
        })

        const userModel = await user.save();

        return res.json({message:"succesfully singup", userData:userModel});
    } catch (error) {
        console.log("error while singing ",error);
    }
}

export const loginRouter = async(req,res)=>{
    try {
        console.log("login starting...")
        const user = req.body;
        if(!user.email || !user.password){
            return res.status(402).json({message:"invalid credentials"})
        }
        const newUser = await userSchema.findOne({email:user.email});
        if(!newUser){
            return res.status(402).json({"message":"invalid credentials"})
        }

        const isMatch = await comparePassword(user.password,newUser.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"})
        }
        console.log("user id ",newUser._id);
        createJSONwebToken(newUser._id,res);
        return res.json({message:"successfully login",newUser})
    } catch (error) {
        console.log("error ",error)
    }
}

export const logoutRouter = async(req,res)=>{
    try {
         res.clearCookie("useridToken", { 
            httpOnly: true,
            sameSite: 'strict',
            // path: '/' // Use if the cookie was set with a specific path
        });
        return res.status(200).json({message:"Logout"})

    } catch (error) {
        console.log("error while loggin out ")
    }
}

export const checkAuth = async(req,res)=>{
    
    return res.json({message:"user getted"});
}