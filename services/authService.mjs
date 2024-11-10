import { json } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Users from "../models/UsersModel.mjs";
export const VerifyToken = asyncHandler(async (req,res) => {
  try {
    const {token}=req.body
    const idUser = await jwt.verify(token, process.env.JWT_CODE);
    const user=await Users.findById(idUser)  ;    
    return res.status(200).json({user:user,idUser:idUser});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
