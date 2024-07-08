import express from "express";
import { uploadImage, getImage } from "../Controllers/imageController.js";
import { login, signup, logoutUser } from "../Controllers/userController.js";
import { newComment,getComment, deleteComment } from "../Controllers/commentController.js";
import { authenticateToken, createNewToken } from "../Controllers/jwtCpontroller.js";

import upload from "../utils/upload.js";
import { createPost, deletePost, getAllPosts, getPost, updatePost } from "../Controllers/postController.js";

const router = express.Router();


router.post('/login', login);
router.post('/logout', logoutUser);
router.post('/signup', signup);


router.post('/token', createNewToken);


router.post('/create', authenticateToken, createPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);
router.get("/post/:id", authenticateToken, getPost);
router.get('/posts', getAllPosts);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/comment/new', authenticateToken, newComment);
router.get('/comment/:id', authenticateToken, getComment);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

export default router;