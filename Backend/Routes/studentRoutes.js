const express = require('express');
const studentAllData = require('../controllers/studentAllData');
const router = express.Router();



router.get('/allstudentdata',studentAllData)


module.exports = router;