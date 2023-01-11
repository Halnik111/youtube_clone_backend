import express from "express";
import {verifyToken} from "../verifyToken.js";
import {addComment, deleteComment, getComments, updateComment} from "../controllers/comment.js";

const router = express.Router();

//Create new comment
router.post("/", verifyToken, addComment);
//Update existing comment
router.put("/:id", verifyToken, updateComment);
//Delete comment
router.delete("/:id", verifyToken, deleteComment);
//Show all comments
router.get("/:id", getComments)


export default router;