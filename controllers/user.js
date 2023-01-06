import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
        const user = User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(err.status).json(err.message);
    }
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
            res.status(err.status).json(err.message);

        }
    }
    else {
        res.status(403).json("Missing access!")
    }
};

export const deleteUser = async (req, res) => {
    if (req.params.id === req.data.id) {
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User deleted!");
        }
        catch (err) {
            res.status(err.status).json(err.message);
        }
    }
    else {
        res.status(403).json("Missing access!")
    }
};

export const likeVideo = async (req, res) => {

};

export const dislikeVideo = async (req, res) => {

};

export const subscribe = async (req, res) => {
    try {
        await User.findById(req.data.id, {
            $push: {subscribedUsers: req.params.id}
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: 1}
        });
        res.status(200).json("Subscribed!");
    } catch (err) {
        res.status(err.status).json(err.message);

    }
};

export const unsubscribe = async (req, res) => {
    try {
        await User.findById(req.data.id, {
            $pull: {subscribedUsers: req.params.id}
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: -1}
        });
        res.status(200).json("Unsubscribed!");
    } catch (err) {
        res.status(err.status).json(err.message);

    }
};
