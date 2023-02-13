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
        const video = await Video.findById(req.params.videoID);

        if (video.like.includes(req.data.id)) {
            await Video.findByIdAndUpdate(req.params.videoID, {
                $pull:{like: req.data.id}
            })
        }
        else {
            await Video.findByIdAndUpdate(req.params.videoID, {
                $addToSet: {like: req.data.id},
                $pull:{dislike: req.data.id}
            });
        }
        res.status(200).json(video);
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
};

export const dislikeVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.videoID);

        if (video.dislike.includes(req.data.id)) {
            await Video.findByIdAndUpdate(req.params.videoID, {
                $pull:{dislike: req.data.id}
            })
        }
        else {
            await Video.findByIdAndUpdate(req.params.videoID, {
                $addToSet: {dislike: req.data.id},
                $pull:{like: req.data.id}
            });
        }
        res.status(200).json("dislike!")

    }
    catch (err) {
        res.status(500).json(err.message);
    }
};

export const subscribe = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.data.id, {
            $push: {subscribedUsers: req.params.id}
        }, {new: true});

        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: 1}
        });

        res.status(200).json(user);
    } catch (err) {
        console.log("error")
        res.status(500).json(err.message);
    }
};

export const unsubscribe = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.data.id, {
            $pull: {subscribedUsers: req.params.id}
        }, {new: true});

        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: -1}
        });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err.message);
    }
};
