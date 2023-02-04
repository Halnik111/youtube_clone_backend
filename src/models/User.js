import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    image:{
        type:String,
        default: 0
    },
    subscribers:{
        type:Number,
        default:0
    },
    subscribedUsers:{
        type:[String],
    },
    fromGoogle:{
        type:Boolean,
        default:false
    },
    },
    { timestamps: true }
);
export default mongoose.model("User", userSchema);