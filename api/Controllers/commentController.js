import Comment from "../model/comment.js";

export const newComment = async(req, res) => {
    try {
        const {comment} = req.body;
        const comments = await Comment.create({comment})
        res.status(200).json({message: "comment is saved successfully"})
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getComment = async(req, res) => {
    try {
        const {id} = req.params
        const comments = await Comment.findById({id})
        if(!comments){return res.status(400).json({message: "post does not exist"})}
        res.status(200).json(comments)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        await comment.delete()

        response.status(200).json('comment deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}