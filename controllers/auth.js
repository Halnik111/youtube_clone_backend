import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({...req.body, password: hash});
        await newUser.save();
        res.status(200).json("User has been created!");
    } catch (err) {
        res.status(409).json("message: " + err);
    }
}

export const signIn = async (req, res) => {
    try {
        const user = await User.findOne({name:req.body.name})
        if (!user) {
            res.status(404).json("message: " + "User not found");
        }
        const comparePassport = await bcrypt.compare(req.body.password, user.password);
        if(!comparePassport) {
            res.status(400).json("message: " + "Incorrect password");
        }

        const token = jwt.sign({id:user._id}, process.env.JWT);
        const {password, ...others} = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200)
           .json(others);

        res.status(200).json("Success!");
    } catch (err) {
        res.status(409).json("message: " + err);
    }
}