
const express = require('express');

const {getPosts,createPost } = require('../controllers/post');
const validator = require('../validator');

//exports.getPosts

const router = express.Router();

router.get('/', getPosts);
router.post("/post", validator.createPostValidator, createPost);

module.exports = router;