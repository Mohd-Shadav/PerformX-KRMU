const express = require('express')
const router = express.Router();
const {MarksEntry, getTrainerData} = require('../controllers/trainers')



router.put('/updatemarks',MarksEntry)
router.get('/gettrainerdata/:id',getTrainerData)


module.exports  = router;
