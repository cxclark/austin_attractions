// Require passport
const passport = require('passport');
// Require user model
const User = require('../models/users');
// Require passport strategy for Google OAuth
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOne({ 'googleID': profile.id }, function(err, user) {
            if (err) return cb(err);
            if (user) {
                return cb(null, user);
            } else {
                // Create a new user in the database
                let newUser = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleID: profile.id,
                });
                newUser.save(function(err){
                    if (err) return cb(err)
                    return cb(null, newUser)
                });
            }
        });
    }
));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});