import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
    const newComment = new Comment({userId: req.data.id,...req.body});
    try {
        await newComment.save();
        res.status(201).json("Comment added.");
    }
    catch (err) {
        res.status(500).json(err.message);
    }

};

export const updateComment = async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if (req.data.id === comment.userId) {
        try {
            await comment.updateOne({
                    $set:req.body
                },
                {new:true}
            );
            res.status(200).json("Comment updated!")
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    else {
            res.status(403).json("Missing access!");
    }

};

export const deleteComment = async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if (req.data.id === comment.userId) {
        try {
            comment.deleteOne();
            res.status(200).json("Comment deleted.");
        }
        catch (err) {
            res.status(500).json(err.message);
        }
    }
    else {
        res.status(403).json("Missing access!");
    }
};

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({videoID: req.params.id})
        res.status(200).json(comments);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
};