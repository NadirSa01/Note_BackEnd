import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false, 
  },
  password: {
    type: String,
    required: true,
  }},
  {
    timestamps:true
});

const Users=mongoose.model("Users",UserSchema);
export default Users;