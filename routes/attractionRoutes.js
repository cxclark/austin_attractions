const express = require('express')
const router = express.Router()
const attractionCtrl = require('../controllers/attractionController')

router.get('/', attractionCtrl.index);

router.get('/new', attractionCtrl.newAttraction);

router.post('/', attractionCtrl.create);

router.get('/:id', attractionCtrl.show);

router.get('/:id/edit', attractionCtrl.showUpdateForm)

router.put('/:id', attractionCtrl.update);

router.delete('/:id', attractionCtrl.deleteAttraction);

module.exports = router