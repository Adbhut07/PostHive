import express from 'express';
import { verifyToken } from '../utils/verifyUser.js'
import { create, getPosts, getPostsByUser } from '../controllers/post.controller.js';

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getPosts);
router.get('/user-posts', verifyToken, getPostsByUser);

export default router;