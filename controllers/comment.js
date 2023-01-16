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
    try {
        const comment = await Comment.findById(req.params.id);
        if (req.data.id === comment.userId) {

            await comment.updateOne({
                    $set:req.body
                },
                {new:true}
            );
            res.status(200).json("Comment updated!")

        }
        else {
            res.status(403).json("Missing access!");
        }
    } catch (err) {
        res.status(500).json(err.message);
    }

};

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (req.data.id === comment.userId) {

            comment.deleteOne();
            res.status(200).json("Comment deleted.");
        } else {
            res.status(403).json("Missing access!");
        }
    }
    catch (err) {
        res.status(500).json(err.message);
    }
};

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({videoID: req.params.videoID});
        res.status(200).json(comments);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
};