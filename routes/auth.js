
const express = require('express');

const {signup } = require('../controllers/auth');
//const validator = require('../validator');

//exports.getPosts

const router = express.Router();

//router.get('/', getPosts);
router.post("/signup", signup);

module.exports = router;