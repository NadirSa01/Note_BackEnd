import Users from "../models/UsersModel.mjs";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
export const SignIn=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    try{
        const user= await Users.findOne({email});
        
        if(!user){
            return res.status(400).json({message:"Email or password incorrect "});
        }
        const isMatch= await bcrypt.compareSync(password,user.password);
        
        if(!isMatch){
            return res.status(400).json({message:"Email or password incorrect "});
        }
        const payload=user.id ;
        const token = jwt.sign(payload,process.env.JWT_CODE);
        return res.status(200).json({User:user,Token:token});
        
    }catch(error){
        res.status(400).json({message:error.message});
    }
})

export const SignUp=asyncHandler(async(req,res)=>{
    const {Name,email,password}=req.body;
    const salt=12;
    try{
    const hashedPw=await bcrypt.hash(password,salt)
        const data={
            Name,
            email, 
            password:hashedPw
        };
        const newUser=await Users.create(data)    ;
        const payload=newUser.id ;
        const token = jwt.sign(payload,process.env.JWT_CODE);        
        return res.status(200).json({User:newUser,Token:token});
    }
    catch(error){
        return res.status(404).json({message:error.message})
    }
})