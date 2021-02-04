
const express = require('express');

const {userById ,allUsers, getUser,updateUser,deleteUser } = require('../controllers/user');
const {requireSignin} = require('../controllers/auth');


//exports.getPosts

const router = express.Router();

//router.get('/', getPosts);
router.get("/users",allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, updateUser);
router.delete("/user/:userId", requireSignin, deleteUser);

//router.get("/signout", signout)

router.param("userId",userById);


module.exports = router;