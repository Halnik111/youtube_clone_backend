import express from "express";
import {verifyToken} from "../verifyToken.js";
import {
    addVideo,
    deleteVideo,
    exploreVideo,
    getVideo, subscriptionVideo,
    trendingVideo,
    updateVideo,
    viewVideo
} from "../controllers/video.js";

const router = express.Router();

router.get("/find/:id", verifyToken, getVideo);
router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.put("/view/:id", viewVideo);
router.get("/trend", trendingVideo);
router.get("/explore", exploreVideo);
router.get("/subscription", verifyToken, subscriptionVideo);


export default router;