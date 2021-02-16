
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

//sudo git clone https://github.com/cornflourblue/node-mongo-registration-login-api /opt/back-end
//https://github.com/NaveenDK/nodeapi.git

//sudo git clone https://github.com/NaveenDK/nodeapi.git /opt/back-end