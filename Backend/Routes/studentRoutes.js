const express = require('express');
const {studentAllData,getStudent} = require('../controllers/studentAllData');
const router = express.Router();



router.get('/allstudentdata',studentAllData)
router.get('/getStudent/:id',getStudent)


module.exports = router;