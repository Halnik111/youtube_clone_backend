import express from "express";
import {deleteUser, dislikeVideo, getUser, likeVideo, subscribe, unsubscribe, updateUser} from "../controllers/user.js";
import {verifyToken} from "../verifyToken.js";

const router = express.Router();

// get user
router.get("/find/:id", getUser);
// update user
router.put("/:id", verifyToken, updateUser);
// delete user
router.delete("/:id", verifyToken, deleteUser);
// like
router.put("/like/:videoId", verifyToken, likeVideo);
// dislike
router.put("/dislike/:videoId", verifyToken, dislikeVideo);
// subscribe
router.put("/sub/:id", verifyToken, subscribe);
// unsubscribe
router.put("/unsub/:id", verifyToken, unsubscribe);


export default router;