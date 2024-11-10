import Users from "../models/UsersModel.mjs";
import Notes from "../models/NotesModel.mjs"
import asyncHandler from "express-async-handler"

//Get Note where the id of user is the same of the note idUser 
export const GetNote= asyncHandler(async(req,res)=>{
    
    const {id}= req.params
    try{
        const Note= await Notes.find({IdUser:id});
        return res.status(200).json({Note:Note})
    }catch(error){
        return res.status(404).json({message:error.message})
    }
})


//Add New Note 

export const AddNote=asyncHandler( async (req,res)=>{
    try{
        const {IdUser,Note,Title}=req.body;
        const searchUser= await Users.findById(IdUser)
        if(!searchUser){
            res.status(404).json({message:"User not found to add note in it "})
        }
        if(!Note || !Title){
            res.status(404).json({message:"All the in inputs are required "})
        }
        let data={
            IdUser,
            Title,
            Note
        }
        
        const newNote =await Notes.create(data);
        console.log(newNote);

        return res.status(200).json({message:"Note add with success"})


    }catch(error){
        res.status(404).json({message:error.message})
    }

})

// Delete note

export const DeleteNote=async(req,res)=>{
    const {id}=req.params;

    try{
        const DeletedNote= await Notes.findByIdAndDelete(id);
        if(!DeletedNote){
            return res.status(404).json({"id":id})
        }
        return res.status(200).send("Deleted with success")
    }catch(error){
        return res.status(400).json({message:error.message})
    }
}

//Update Note 

export const UpdateNote=async(req,res)=>{
    const {id}=req.params;
    try{
        const {Note}=req.body;
        const UpdatedNote= await Notes.findByIdAndUpdate(id,{Note},{new:true});
        if(!UpdateNote){
            return res.status(404).send("Note not found ")
        }
        return res.status(200).send("Updated with success ")
    }catch(error){
        return res.status(400).json({json:error.message})
    }
}