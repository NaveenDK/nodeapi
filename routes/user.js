
const express = require('express');

const {userById ,allUsers, getUser,updateUser,deleteUser } = require('../controllers/user');
const {requireSignin} = require('../controllers/auth');


//exports.getPosts

const router = express.Router();

//router.get('/', getPosts);
router.get("/api/users",allUsers);
router.get("/api/user/:userId", requireSignin, getUser);
router.put("/api/user/:userId", requireSignin, updateUser);
router.delete("/api/user/:userId", requireSignin, deleteUser);

//router.get("/signout", signout)

router.param("userId",userById);


module.exports = router;