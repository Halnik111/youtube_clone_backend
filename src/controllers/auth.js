import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({...req.body, password: hash});
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(409).json("message: " + err.message);
    }
}

export const signIn = async (req, res) => {
    try {
        const username = await User.findOne({name:req.body.name})

        if (!username) {
             return res.status(404).json("User not found");
        }
        const comparePassword = await bcrypt.compare(req.body.password, username.password);

        if(!comparePassword) {
             res.status(400).json("Incorrect password");
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

export const signOut = async (req,res) => {
    try {
        await res.cookie("access_token", "0", {
            httpOnly: true,
        }).status(200).json("Account signed out!");
    } catch (err) {
        res.status(500).json("message: " + err.message);
    }
};

export const googleAuth = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (user) {
            const token = jwt.sign({id:user._id}, process.env.JWT);
            res.cookie("access_token", token, {
                    httpOnly: true,
                },
                {new:true}
            ).status(200)
               .json(user._doc);
        }
        else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            });
            await newUser.save();
            const token = jwt.sign({id:newUser._id}, process.env.JWT);
            res.cookie("access_token", token, {
                    httpOnly: true,
                },
                {new:true}
            ).status(200)
               .json(newUser._doc);
        }
    }
    catch (err) {
        res.status(409).json("message: " + err.message);
    }
}
