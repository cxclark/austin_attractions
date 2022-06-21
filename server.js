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
// Redirect home path to index page
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