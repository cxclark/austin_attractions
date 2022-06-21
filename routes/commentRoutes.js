// Require express
const express = require('express')
// Create a new router object
const router = express.Router()
// Require comments controller
const commentCtrl = require('../controllers/commentController')

router.post('/:id/comments', commentCtrl.create)

module.exports = router