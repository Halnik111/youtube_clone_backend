import express from "express";
import {verifyToken} from "../../verifyToken.js";
import {
    addComment,
    deleteComment,
    dislikeComment,
    getComments,
    likeComment,
    updateComment
} from "../controllers/comment.js";

const router = express.Router();

//Create new comment
router.post("/", verifyToken, addComment);
//Update existing comment
router.put("/:id", verifyToken, updateComment);
//Delete comment
router.delete("/:id", verifyToken, deleteComment);
//Show all comments
router.get("/:videoID", getComments);
//like a comment
router.put("/like/:commentId", verifyToken, likeComment)
//dislike a comment
router.put("/dislike/:commentId", verifyToken, dislikeComment)


export default router;