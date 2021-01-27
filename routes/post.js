
const express = require('express');

const {getPosts,createPost } = require('../controllers/post');
const {createPostValidator} = require('../validator');

//exports.getPosts

const router = express.Router();

router.get('/', getPosts);
router.post("/post", createPostValidator, createPost);

module.exports = router;