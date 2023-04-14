import Video from "../models/Video.js";
import User from "../models/User.js";

export const getVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    }
    catch (err) {
        res.status(404).json(err.message);
    }
};

export const addVideo = async (req, res) => {
    const newVideo = new Video({userId:req.data.id, ...req.body});
    try {
        await newVideo.save();
        res.status(200).json("Video added!");
    }
    catch (err) {
        res.status(500).json(err.message);
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
        res.status(404).json(err.message);
    }
};

export const viewVideo = async (req, res) => {
    try {
        const views = await Video.findByIdAndUpdate(req.params.id, {
           $inc:{views: 1}
        });
        res.status(200).json(views.views);
    }
    catch (err) {
        res.status(404).json(err.message);
    }
};

export const trendingVideo = async (req, res) => {
    try {
        const video = await Video.find().sort({views: -1});
        res.status(200).json(video);
    }
    catch (err) {
        res.status(404).json(err.message);
    }
};

export const exploreVideo = async (req, res) => {
    try {
        const video = await Video.aggregate([{$sample:{size: 40}}]);
        res.status(200).json(video);
    }
    catch (err) {
        res.status(404).json(err.message);
    }
};

export const subscriptionVideo = async (req, res) => {
    try {
        const account = await User.findById(req.data.id);
        const subscribedAccounts = account.subscribedUsers;
        await Promise.all(subscribedAccounts.map(channel => Video.find({userId: channel})))
                     .then(data => res.status(200).json(data.flat()))
                     .catch(err => res.status(404).json(err.message));
    }
    catch (err) {
        res.status(404).json(err.message);
    }
};

export const searchVideo = async (req, res) => {
    const tags = req.query.tags.split(",");
    try {
        const videoSearch = await Video.find({$or: [{videoTitle: {$regex: req.query.tags, $options:"i" }}, {tags: {$in: tags}}]}).limit(20);
        res.status(200).json(videoSearch.sort((a,b) => a.updatedAt - b.updatedAt));
    }
    catch (err) {
            throw res.status(404).json(err.message);
    }
}





