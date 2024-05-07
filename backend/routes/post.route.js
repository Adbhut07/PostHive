import express from 'express';
import { verifyToken } from '../utils/verifyUser.js'
import { create, getPosts, getPostsByUser, deletePost, updatePost } from '../controllers/post.controller.js';

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getPosts);
router.get('/user-posts', verifyToken, getPostsByUser);
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost);
router.put('/updatepost/:postId/:userId', verifyToken, updatePost);

export default router;