import express from "express";
import {deleteUser, dislikeVideo, getUser, likeVideo, subscribe, unsubscribe, updateUser} from "../controllers/user.js";
import {verifyToken} from "../../verifyToken.js";

const router = express.Router();

// get user
router.get("/find/:id", getUser);
// update user
router.put("/", verifyToken, updateUser);
// delete user
router.delete("/", verifyToken, deleteUser);
// like
router.put("/like/:videoID", verifyToken, likeVideo);
// dislike
router.put("/dislike/:videoID", verifyToken, dislikeVideo);
// subscribe
router.put("/sub/:id", verifyToken, subscribe);
// unsubscribe
router.put("/unsub/:id", verifyToken, unsubscribe);


export default router;