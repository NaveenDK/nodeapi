
const express = require('express');
const {requireSignin} = require('../controllers/auth');
const {getPosts,createPost,postsByUser } = require('../controllers/post');
const {userById} = require("../controllers/user");
//const {}

const {createPostValidator} = require('../validator');

//exports.getPosts

const router = express.Router();

router.get('/', requireSignin,getPosts);
router.post( 
    "/post/new/:userId",
    requireSignin,
    createPost,
    createPostValidator,
);

router.get("/posts/by/:userId", requireSignin, postsByUser );
///any route containing : userID our app will execute userById()
router.param("userId", userById);



module.exports = router;