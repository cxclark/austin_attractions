const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/commentController')


router.post('/', commentCtrl.create)



module.exports = router