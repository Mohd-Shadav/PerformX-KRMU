const express = require('express');
const {auth} = require('../controllers/auth');
const {logOut} = require('../controllers/auth');
const router = express.Router();



router.post('/auth',auth);
router.get('/loggedout',logOut)


module.exports = router;