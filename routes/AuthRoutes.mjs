import express from "express"
import { SignIn ,SignUp} from "../controllers/AuthenticationController.mjs";
import { VerifyToken } from "../services/authService.mjs";
const AuthRouter=express.Router();
AuthRouter.post("/SignIn",SignIn);
AuthRouter.post("/SignUp",SignUp);
AuthRouter.post("/VerfiyT",VerifyToken);
export default AuthRouter;