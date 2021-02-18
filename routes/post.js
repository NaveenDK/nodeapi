
const express = require('express');
const {requireSignin} = require('../controllers/auth');
const {getPosts,createPost,postsByUser, isPoster, deletePost,postById,updatePost } = require('../controllers/post');
const {userById} = require("../controllers/user");
//const {}

const {createPostValidator} = require('../validator');

//exports.getPosts

const router = express.Router();

router.get('/posts', getPosts);
router.post( 
    "/post/new/:user_Id",
    requireSignin,
    createPost,
    createPostValidator,
);

router.get("/posts/by/:user_Id", requireSignin, postsByUser );

router.put(
    '/post/:postId', requireSignin, isPoster, updatePost
)


router.delete(
    '/post/:postId', requireSignin, isPoster, deletePost
)
///any route containing : user_Id our app will execute userById()
router.param("user_Id", userById);

router.param("postId",postById);


module.exports = router;