import express from "express";
import {verifyToken} from "../verifyToken.js";
import {
    addVideo,
    deleteVideo,
    exploreVideo,
    getVideo, searchVideo, subscriptionVideo,
    trendingVideo,
    updateVideo,
    viewVideo
} from "../controllers/video.js";

const router = express.Router();

//SHOW video
router.get("/find/:id", verifyToken, getVideo);
//UPLOAD video
router.post("/", verifyToken, addVideo);
//UPDATE video
router.put("/:id", verifyToken, updateVideo);
//DELETE video
router.delete("/:id", verifyToken, deleteVideo);
//VIEW video
router.put("/view/:id", viewVideo);
//SHOW trending videos
router.get("/trend", trendingVideo);
//SHOW random videos
router.get("/explore", exploreVideo);
//SHOW videos of subscribed channels
router.get("/subscription", verifyToken, subscriptionVideo);
//SEARCH videos
router.get("/search", searchVideo);


export default router;