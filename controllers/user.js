import User from "../models/User.js";
import Video from "../models/Video.js";

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
};

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.data.id, {
                $set:req.body
            },
            {new:true}
        );
        res.status(200).json(updatedUser);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
};

export const deleteUser = async (req, res) => {
    try{
        await User.findByIdAndDelete(req.data.id);
        res.cookie("access_token", "0", {
            httpOnly: true
        })
        res.status(200).json("User deleted!");
    }
    catch (err) {
        res.status(500).json(err.message);
    }
}

export const likeVideo = async (req, res) => {
    try {
       await Video.findByIdAndUpdate(req.params.videoID, {
            $addToSet: {like: req.data.id},
           $pull:{dislike: req.data.id}
        });
        res.status(200).json("liked!");
    }
    catch (err) {
        res.status(500).json(err.message);
    }
};

export const dislikeVideo = async (req, res) => {
    try {
        await Video.findByIdAndUpdate(req.params.videoID, {
            $addToSet: {dislike: req.data.id},
            $pull:{like: req.data.id}
        });
        res.status(200).json("dislike!")

    }
    catch (err) {
        res.status(500).json(err.message);
    }
};

export const subscribe = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.data.id, {
            $push: {subscribedUsers: req.params.id}
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: 1}
        });
        res.status(200).json("Subscribed!");
    } catch (err) {
        res.status(500).json(err.message);

    }
};

export const unsubscribe = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.data.id, {
            $pull: {subscribedUsers: req.params.id}
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: -1}
        });
        res.status(200).json("Unsubscribed!");
    } catch (err) {
        res.status(500).json(err.message);
    }
};
