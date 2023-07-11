const express = require('express');
const { register, login, getAllUsers, followUsers, unFollowUsers, getAllFollowersPosts } = require('../controllers/users');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getAllUsers/:id', auth, getAllUsers)
router.put('/updateFollowing', auth, followUsers)
router.put('/updateUnFollowing', auth, unFollowUsers)
router.get('/followersPosts/:id', auth, getAllFollowersPosts)

module.exports = router;