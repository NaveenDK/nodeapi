
const express = require('express');

const {signup } = require('../controllers/auth');
const {userSignupValidator} = require('../validator');

//exports.getPosts

const router = express.Router();

//router.get('/', getPosts);
router.post("/signup",userSignupValidator, signup);

module.exports = router;