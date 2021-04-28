import express from 'express';

import { getArticles, postArticle, likeArticle, updateArticle, deleteArticle } from '../controllers/articles.js';

import auth from '../middleware/auth.js';

const router = express.Router();


router.get('/', getArticles);
router.post('/', auth, postArticle);
router.patch('/:id', auth, updateArticle);
router.delete('/:id', auth, deleteArticle);
router.patch('/:id/likeArticle', auth, likeArticle);

export default router;