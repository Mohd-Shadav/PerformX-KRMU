const express = require('express')
const router = express.Router();
const {MarksEntry, getTrainerData, mockEvaluatorMarksEntry} = require('../controllers/trainers')



router.put('/updatemarks',MarksEntry)
router.get('/gettrainerdata/:id',getTrainerData)
router.put('/updatemockevaluationmarks',mockEvaluatorMarksEntry)


module.exports  = router;
