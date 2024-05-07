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
        res.status(500).json({ message: error.message });
    }
}

export const getPosts = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const query = {
      ...(req.query.userId && { author: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    };
    const posts = await Post.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments(query);

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      ...query,
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  


export const getPostsByUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized: You must be logged in to view your posts." });
        }

        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        // Filter posts based on the authenticated user's ID
        const posts = await Post.find({ author: req.user.userId })
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalPosts = await Post.countDocuments({ author: req.user.userId });

        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const lastMonthPosts = await Post.countDocuments({
            author: req.user.userId,
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePost = async(req,res)=>{
    if(req.user.userId !== req.params.userId){
        return res.status(403).json("You are not allowed to delete this post");
    }
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json("The post has been deleted");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
  if (req.user.userId !== req.params.userId) {
    return res.status(403).json("You are not allowed to update this post");
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, {
      $set: {
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        image: req.body.image
      }
    }, {new: true});
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};