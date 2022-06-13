const express = require('express')
const router = express.Router()
const attractionCtrl = require('../controllers/attractionController')

// Cloudinary and Multer
// Ref 14:00 of https://www.youtube.com/watch?v=LWB1s6P0wgE&ab_channel=FarhanFarooq
const upload = require('../utils/multer');

router.get('/', attractionCtrl.index);

router.get('/new', attractionCtrl.showNewForm);

router.post('/', upload.single('image'), attractionCtrl.create);

router.get('/:id', attractionCtrl.show);

router.get('/:id/edit', attractionCtrl.showUpdateForm)

router.patch('/:id', attractionCtrl.update);

router.delete('/:id', attractionCtrl.deleteAttraction);

module.exports = router