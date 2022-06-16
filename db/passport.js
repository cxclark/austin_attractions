const passport = require('passport');
const User = require('../models/users');
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
                    return cb(null, newStudent)
                });
            }
        });
    }
));

passport.serializeUser(function(student, done){
    done(null, student.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, student){
        done(err, student);
    });
});