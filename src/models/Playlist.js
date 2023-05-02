import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema( {
    userId: {
        type:String,
        required:true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    videos: {
        type:[String],
    },
}, {timestamps:true}
);

export default mongoose.model("Playlist", playlistSchema);