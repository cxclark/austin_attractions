const express = require('express');
const router = express.Router();
const attractionCtrl = require('../controllers/attractionController');
const passport = require('passport');

// Require multer for image uploads
const upload = require('../utils/multer');

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google', 
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
// Callback route that Google will call after the user confirms
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/attractions',
    failureRedirect : '/attractions'
  }
));

// Google OAuth logout route
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/attractions');
});

router.get('/', attractionCtrl.index);

router.get('/new', attractionCtrl.showNewForm);

router.post('/', upload.single('image'), attractionCtrl.create);

router.get('/:id', attractionCtrl.show);

router.get('/:id/edit', attractionCtrl.showUpdateForm);

router.patch('/:id', attractionCtrl.update);

router.delete('/:id', attractionCtrl.deleteAttraction);

module.exports = router