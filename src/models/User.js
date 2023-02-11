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
        default: "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
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