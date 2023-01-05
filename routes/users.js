import express from "express";
import {deleteUser, dislikeVideo, getUser, likeVideo, subscribe, unsubscribe, updateUser} from "../controllers/user.js";
import {verifyToken} from "../verifyToken.js";

const router = express.Router();

// get user
router.get("/:id", getUser);

// update user
router.put("/:id", verifyToken, updateUser);

// delete user
router.delete("/find/:id", deleteUser);

// like
router.put("/like/:videoId", likeVideo);

// dislike
router.put("/dislike/:videoId", dislikeVideo);

// subscribe
router.put("/sub/:id", subscribe);

// unsubscribe
router.put("/unsub/:id", unsubscribe);


export default router;