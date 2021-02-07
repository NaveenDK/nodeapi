
const express = require('express');
const {requireSignin} = require('../controllers/auth');
const {getPosts,createPost,postsByUser, isPoster, deletePost,postById } = require('../controllers/post');
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

router.delete(
    '/post/:postId', requireSignin, isPoster, deletePost
)
///any route containing : userID our app will execute userById()
router.param("userId", userById);

router.param("postId",postById);


module.exports = router;