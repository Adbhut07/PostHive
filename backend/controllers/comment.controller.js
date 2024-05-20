import Comment from '../models/comment.model.js';

export const createComment = async(req,res) =>{
    try{
        const { content, postId, userId } = req.body;
        if(userId !== req.user.userId){
            return res.status(403).json('You are not allowed to create this comment');
        }
        const newComment = new Comment({
            content,
            postId,
            userId,
        });
        await newComment.save();
        res.status(200).json(newComment);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

export const getPostComments = async(req,res) =>{
    try {
        const comments = await Comment.find({postId: req.params.postId}).sort({
            createdAt: -1,
        });   

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}