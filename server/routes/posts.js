import express from 'express';
import auth from '../middleware/auth.js'
const router = express.Router();
import { getPost, getPostBySearch, getPosts, createPost, updatePost, deletePost, likePost, unlikePost } from '../controllers/postsController.js'
router.get('/', getPosts);
router.get('/search', getPostBySearch);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.patch('/:id/unlikePost', unlikePost);
export default router;