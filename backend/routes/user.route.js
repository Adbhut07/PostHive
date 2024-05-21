import express from 'express';
import { updateUser, deleteUser, signOut, getUser} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router();

router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signOut);
router.get('/:userId', getUser);


export default router;