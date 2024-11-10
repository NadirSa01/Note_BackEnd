import express from "express"
import { AddUser, DeleteUser, GetUser, UpdatePassword, UpdateUser } from "../controllers/UserController.mjs"

const UserRouter=express.Router();
UserRouter.get("/user",GetUser);
UserRouter.post("/user",AddUser);
UserRouter.delete("/user/:id",DeleteUser);
UserRouter.put("/user/:id",UpdateUser);
UserRouter.put("/userP/:id",UpdatePassword);

export default UserRouter;
