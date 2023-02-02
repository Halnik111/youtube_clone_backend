import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({...req.body, password: hash});
        await newUser.save();
        res.status(201).json("User has been created!");
    } catch (err) {
        res.status(409).json("message: " + err.message);
    }
}

export const signIn = async (req, res) => {
    try {
        const username = await User.findOne({name:req.body.name})

        if (!username) {
             return res.status(404).json("message: " + "User not found");
        }
        const comparePassword = await bcrypt.compare(req.body.password, username.password);

        if(!comparePassword) {
             res.status(400).json("message: " + "Incorrect password");
        }
        else {
            const token = jwt.sign({id:username._id}, process.env.JWT);
            const {password, ...others} = username._doc;

            res.cookie("access_token", token, {
                    httpOnly: true,
                },
                 {new:true}
            ).status(200)
               .json(others);
        }
    } catch (err) {
        res.status(500).json("message: " + err.message);
    }
}

export const signOut = (req,res) => {
    try {
        res.cookie("access_token", "0", {
            httpOnly: true
        }).status(200).json("Account signed out!");
    } catch (err) {
        res.status(err.status).json("message: " + err.message);
    }
};
