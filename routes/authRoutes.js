const express = require('express')
const router = express.Router()
const passport = require('passport');


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
    req.logout(err => {
      if (err) return next(err)
      res.redirect('/attractions')
    });
});

module.exports = router