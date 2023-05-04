import Playlist from "../models/Playlist.js";
import Video from "../models/Video.js";

export const createPlaylist = async (req, res) => {
    const newPlaylist = new Playlist( {userId: req.data.id, name: req.body.name});
    try {
        await newPlaylist.save();
        res.status(201).json(newPlaylist);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
};

export const getUserPlaylists = async (req,res) => {
    try {
        const playlists = await Playlist.find({userId: req.params.id});
        res.status(200).json(playlists);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
}

export const addVideoToPlaylist = async (req,res) => {
    try {
        const playlist = await Playlist.findByIdAndUpdate(req.params.id, {
            $push: {videos: req.body.video}
        }, {new: true});
        res.status(200).json(playlist);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
}

export const removeVideoFromPlaylist = async (req,res) => {
    try {
        const playlist = await Playlist.findByIdAndUpdate(req.params.id, {
            $pull: {videos: req.body.video}
        }, {new: true});
        res.status(200).json(playlist);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
}

export const playlistVideos = async (req,res) => {
    try {
        const playlist = await Playlist.findById(req.params.id)
        const videos = await Video.find({_id: {$in: playlist.videos}})
        res.status(200).json(videos);
    }
    catch (err) {
        res.status(404).json(err.message);
    }
}