// DONE 6-11: Finalize backend schemas
// DONE 6-11: Create EJS and render pages for website
// DONE 6-11: Create Partial EJS's for header and footers
// DONE 6-11: Set up Multr and Cloudinary for photos
// DONE 6-11: Get photos to display on website
// DONE 6-11: Find Bootstrap nav bar template
// DONE 6-11: Find Bootstrap card tiles template
// DONE: 6-14: Set up O-Auth and login stuff
// 6-15: Update Add Attraction Route
// 6-15: Fix issues with O-Auth
// 6-15: Finalize User Model
// 6-15: Sign up for Atlas and host database
// 6-16: Sign up for Heroku, and install: https://git.generalassemb.ly/Flex-322/Heroku_Atlas_Deployment_cheatsheet

const express = require('express');
const path = require('path');
const PORT = 7000;
const app = express();
const attractionRoutes = require('./routes/attractionRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authRoutes = require('./routes/authRoutes');
const methodOverride = require('method-override');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

// Load environment variables in .env file to make them available
const dotenv = require('dotenv');
dotenv.config();

// Require DB connection and run passport
require('./db/connection');
require('./db/passport');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares start here
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'Using OAuth Woot!',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// Middlewares end here

// // Google OAuth login route
// app.get('/auth/google', passport.authenticate(
//   'google', 
//   { scope: ['profile', 'email'] }
// ));

// // Google OAuth callback route
// // Callback route that Google will call after the user confirms
// app.get('/oauth2callback', passport.authenticate(
//   'google',
//   {
//     successRedirect : '/attractions',
//     failureRedirect : '/attractions'
//   }
// ));

// // Google OAuth logout route
// app.get('/logout', function(req, res){
//     req.logout();
//     res.redirect('/attractions');
// });

// Routes start here
app.use(function (req, res, next) {
    res.locals.user = req.user;
    console.log(req.user)
    next();
    }); 
app.use('/', authRoutes)
app.use('/attractions', attractionRoutes)
app.use('/attractions', commentRoutes)
// Routes ened here

// Tell express to match files to those in 'public' folder
app.use(express.static('./public'));

app.listen(PORT, ()=> {
    console.log(`Listening on PORT ${PORT}`)
})