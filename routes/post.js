
const express = require('express');

const postController = require('../controllers/post');

//exports.getPosts

const router = express.Router();

router.get('/', postController.getPosts)

module.exports = router;