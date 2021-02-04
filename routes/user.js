
const express = require('express');

const {userById ,allUsers } = require('../controllers/user');


//exports.getPosts

const router = express.Router();

//router.get('/', getPosts);
router.get("/users",allUsers)

//router.get("/signout", signout)




module.exports = router;