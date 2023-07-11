const express = require('express');
const { getPosts, createPost, updatePost, deletePost } = require('../controllers/posts');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;