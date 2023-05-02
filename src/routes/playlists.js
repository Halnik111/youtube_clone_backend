import express from "express";
import {verifyToken} from "../../verifyToken.js";
import {createPlaylist, getUserPlaylists} from "../controllers/playlist.js";
import {playlistVideos} from "../controllers/playlist.js";

const router = express.Router();

router.post("/", verifyToken, createPlaylist);
router.get("/:id", getUserPlaylists);
//SHOW playlist videos
router.get("/preview/:id", playlistVideos);

export default router;