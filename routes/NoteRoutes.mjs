import express from "express"
import { AddNote, DeleteNote, GetNote, UpdateNote } from "../controllers/NoteController.mjs";

const NoteRouter=express.Router();

NoteRouter.get("/note/:id",GetNote)
NoteRouter.post("/note",AddNote)
NoteRouter.delete("/note/:id",DeleteNote)
NoteRouter.put("/note/:id",UpdateNote)


export default NoteRouter;