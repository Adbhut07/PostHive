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

export const likeComment = async (req,res) =>{
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return res.status(404).json({message: "Comment not found"});
        }
        const userIndex = comment.likes.indexOf(req.user.userId);
        if(userIndex === -1){
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.userId);
        } else{
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1);
        }
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const editComment = async(req,res) =>{
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return res.status(404).json({message: "Comment not found"});
        }
        if (comment.userId !== req.user.userId) {
            return res.status(403).json({message: "You are not allowed to edit this comment"});
        }
        const editedComment = await Comment.findByIdAndUpdate(req.params.commentId,
          {
            content: req.body.content,
          },
          { new: true }
        );
        res.status(200).json(editedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}