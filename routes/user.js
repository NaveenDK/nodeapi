
const express = require('express');

const {userById ,allUsers, getUser } = require('../controllers/user');


//exports.getPosts

const router = express.Router();

//router.get('/', getPosts);
router.get("/users",allUsers);
router.get("/user/:userId",getUser);

//router.get("/signout", signout)

router.param("userId",userById);


module.exports = router;