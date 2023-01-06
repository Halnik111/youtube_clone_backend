import Video from "../models/Video.js";
import User from "../models/User.js";

export const getVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    }
    catch (err) {
        res.status(err.status).json(err.message);
    }
};

export const addVideo = async (req, res) => {
    const newVideo = new Video({userId:req.data.id, ...req.body});
    try {
        await newVideo.save();
        res.status(200).json("Video added!");
    }
    catch (err) {
        res.status(err.status).json(err.message);
    }
};

export const updateVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (req.data.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
               $set:req.body
            },
                {new:true}
            );
            res.status(200).json(updatedVideo + "Video updated!")
        }
        else {
            res.status(403).json("Missing access");
        }
    }
    catch (err) {
        res.status(err.status).json(err.message);
    }
};

export const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (req.data.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("Video deleted!")
        }
        else {
            res.status(403).json("Missing access");
        }
    }
    catch (err) {
        res.status(err.status).json(err.message);
    }
};

export const viewVideo = async (req, res) => {
    try {
        Video.findByIdAndUpdate(req.params.id, {
           $inc:{views: 1}
        });
        res.status(200).json("View +1");
    }
    catch (err) {
        res.status(err.status).json(err.message);
    }
};

export const trendingVideo = async (req, res) => {
    try {
        const video = await Video.find().sort({views: -1});
        res.status(200).json(video);
    }
    catch (err) {
        res.status(err.status).json(err.message);
    }
};

export const exploreVideo = async (req, res) => {
    try {
        const video = await Video.aggregate([{$sample:{size: 40}}]);
        res.status(200).json(video);
    }
    catch (err) {
        res.status(err.status).json(err.message);
    }
};

export const subscriptionVideo = async (req, res) => {
    try {
        const account = await User.findById(req.data.id);
        const subChannels = await account.subscribedUsers;
        const list = Promise.all(subChannels.map(channel => {
            return Video.find({userId: channel})
        }));
        res.status(200).json(list);
    }
    catch (err) {
        res.status(err.status).json(err.message);
    }
};





