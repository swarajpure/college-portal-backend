const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const postsController = require('../controllers/posts')

// router.get('/', authenticate.isUser, postsController.getPosts);
router.get('/', authenticate.isUser, postsController.getPosts);
router.post('/create', authenticate.isTeacher, postsController.createPost);

module.exports = router;