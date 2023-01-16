import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    videoTitle:{
        type:String,
        required:true,
    },
    videoDescription:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    videoUrl:{
        type:String,
        required:true,
    },
    views:{
        type:Number,
    },
    tags:{
        type:[String],
        default:[],
    },
    like:{
        type:[String],
        default:[],
    },
    dislike:{
        type:[String],
        default:[],
    }
    },
    { timestamps: true }
);

export default mongoose.model("Video", videoSchema);