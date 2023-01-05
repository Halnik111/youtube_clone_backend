import User from "../models/User.js";

export const getUser = (req, res) => {

};

export const updateUser = async (req, res) => {
    if (req.params.id === req.data.id) {
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set:req.body
            },
                {new:true}
            );
            res.status(200).json(updatedUser);
        }
        catch (err) {

        }
    }
    else {
        res.status(403).json("Missing access!")
    }
};

export const deleteUser = (req, res) => {

};

export const likeVideo = (req, res) => {

};

export const dislikeVideo = (req, res) => {

};

export const subscribe = (req, res) => {

};

export const unsubscribe = (req, res) => {

};
