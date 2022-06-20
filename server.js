// DONE: 6-16: Sign up for Heroku, and install: https://git.generalassemb.ly/Flex-322/Heroku_Atlas_Deployment_cheatsheet
// 6-16: Update passport-local https://www.passportjs.org/packages/passport-local/
// 6-16: Use bcrypt for passwords: https://www.npmjs.com/package/bcrypt
// 6/17: Delete Procfile?
// 6-18: Finalize User Model & Pages

// 6-20: Clean up Comments section
// 6-20: Clean up Code and Prep Submission
// 6-20: Edit User/Login/Logout if time permits

// Load environment variables in .env file to make them available
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;
const app = express();
const attractionRoutes = require('./routes/attractionRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authRoutes = require('./routes/authRoutes');
const methodOverride = require('method-override');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

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

// Had trouble using process.env.SESSION_SECRET here.
// It would create an Internal Server Error for Heroku
app.use(session({
    secret: 'secretIDhere',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// Middlewares end here

// Routes start here

// // TEST CODE WHEN TROUBLESHOOTING OAUTH
// app.use(function (req, res, next) {
//     res.locals.user = req.user;
//     console.log(req.user)
//     next();
//     }); 
    
// Send 'Home' on home path 
app.get('/', (req, res) => {
    res.redirect('/attractions')
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