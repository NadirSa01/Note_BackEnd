import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    IdUser: {
      type: String,
      required: true,
    },
    Title:{
      type:String,
      required:false
    },

    Note: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Notes=mongoose.model("Note",NoteSchema);
export default Notes;
