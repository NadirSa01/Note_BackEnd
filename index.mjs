import * as dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express"
import cors  from "cors"
import UserRouter from "./routes/UserRoutes.mjs";
import NoteRouter from "./routes/NoteRoutes.mjs";
import AuthRouter from "./routes/AuthRoutes.mjs";

dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());
const _PORT=3000;
const ConnectDB=()=>{
    mongoose.connect(process.env.Db_URL,{
        dbName:"Notes"
    })
    .then(()=>{
        console.log("MongoDB is connected  successfully ");
    }).catch("Error  on connection to MongoDB");
}
const StartServer=async ()=>{
    try{
        ConnectDB();
        app.listen(_PORT,()=>{
            console.log("Server Started On prot 3000");
        })
    }catch(error){
        console.log(error);
    }
}
app.use("/api",UserRouter);
app.use("/api",NoteRouter);
app.use("/api",AuthRouter);

StartServer();


