import Post from '../models/post.model.js';

export const create = async(req,res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized: You must be logged in to create a post." });
        }
        if (!req.body.title || !req.body.content) {
            return res.status(400).json({message: "Please provide all required fields"});
        }
        const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
        const newPost = new Post({
            ...req.body,
            slug,
            author: req.user.userId,
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) { 
        console.error("Error creating post:", error);
        res.status(500).json({ error: "An error occurred while creating the post." });
    }
}