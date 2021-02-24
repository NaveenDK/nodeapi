
const express = require('express');

const {userById ,allUsers, getUser,updateUser,deleteUser 
    
    ,userPhoto
, addFollowing,
addFollower, removeFollowing, removeFollower


}

= require('../controllers/user');
const {requireSignin} = require('../controllers/auth');


//exports.getPosts

const router = express.Router();

router.put('/user/follow', requireSignin, addFollowing,addFollower );
router.put('/user/unfollow', requireSignin, removeFollowing, removeFollower);


//router.get('/', getPosts);
router.get("/users",allUsers);
router.get("/user/:user_Id", requireSignin, getUser);
router.put("/user/:user_Id", requireSignin, updateUser);
router.delete("/user/:user_Id", requireSignin, deleteUser);

//router.get("/signout", signout)

router.get("/user/photo/:user_Id",userPhoto )

router.param("user_Id",userById);


module.exports = router;