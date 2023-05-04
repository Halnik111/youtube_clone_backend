import express from "express";
import {verifyToken} from "../../verifyToken.js";
import {
    addVideoToPlaylist,
    createPlaylist,
    getUserPlaylists,
    removeVideoFromPlaylist
} from "../controllers/playlist.js";
import {playlistVideos} from "../controllers/playlist.js";

const router = express.Router();

//create new playlist
router.post("/", verifyToken, createPlaylist);
//find channel playlists
router.get("/:id", getUserPlaylists);
//SHOW playlist videos
router.get("/preview/:id", playlistVideos);
//add video to playlist
router.put("/add/:id", verifyToken, addVideoToPlaylist);
//remove video from playlist
router.put("/remove/:id", verifyToken, removeVideoFromPlaylist);

export default router;