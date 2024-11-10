import bcrypt from "bcrypt"
import Users from "../models/UsersModel.mjs";
import asyncHandler from "express-async-handler"

// Get Users 
export const GetUser=async(req,res)=>{
    try{
        const users= await Users.find();
        return res.status(200).json(users)
    }
    catch(error){
        return res.status(400).json({message:error.message})
    }
}

//Add new users 
export const AddUser= async(req,res)=>{
    const salt=15;
    try {
        const {Name,email,password}=req.body;
        const hashedPw=await bcrypt.hash(password,salt)
        const data={
            Name,
            email, 
            password:hashedPw
        };
        await Users.create(data)    ;
        return res.status(200).json("User Add with success")
    }
    catch(error){
        return res.status(404).json({message:error.message})
    }
}


//update users data 
export const UpdateUser=async(req,res)=>{
    const {id}=req.params;
    try{
        const {Name,Age,email}=req.body;
        const UpdatedUser=await Users.findByIdAndUpdate(id,{Name,Age,email},{new:true})
        if (!UpdatedUser) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.status(200).send("Updated with success")

    }catch(error){
        return res.status(404).json({message:error.message})
    }
};


//Delete user
export const DeleteUser=async(req,res)=>{
    const {id}=req.params
    try{
        const user = await Users.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).send("User no found ")
        }
        return res.status(200).send("Deleted with success");
    }catch(error){
        return res.status(400).json({message:error.message})
    }
}

//Update user password

export const UpdatePassword=async(req,res)=>{
    const {id}=req.params;

    // salt range always should be under than 15 and bigger than 10
    const salt=10
    try{
        const user = await Users.findById(id);
        if(!user){
            return res.status(404).send("User not found");
        }
        const {password}=req.body;
        const hashedPw=await bcrypt.hash(password,salt)

        // You don't need to test if the password is hashed 

        const updatedUserPw =await Users.findByIdAndUpdate(id,{password:hashedPw},{new:true})
        if(!updatedUserPw){
            return res.status(404).send("Failed to update")
        }
        return res.status(200).send("Password updated successfully")
    }catch(error){
        return res.status(400).json({message:error.message})
    }
}