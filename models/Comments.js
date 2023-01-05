import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    videoID:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
    },
    { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);