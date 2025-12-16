const express = require('express')
const router = express.Router();
const marksEntry = require('../controllers/trainers')



router.put('/updatemarks',marksEntry)


module.exports  = router;
