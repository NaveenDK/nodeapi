
const express = require('express');

const {signup, signin , signout  } = require('../controllers/auth');
const {userById  } = require('../controllers/user');
const {userSignupValidator} = require('../validator');

//exports.getPosts

const router = express.Router();

//router.get('/', getPosts);
router.post("/signup",userSignupValidator, signup);

router.post("/signin", signin);


router.get("/signout", signout)




module.exports = router;