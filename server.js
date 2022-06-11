// 6-11: Finalize backend schemas
// 6-11: Create EJS and render pages for website
// 6-11: Create Partial EJS's for header and footers
// 6-11: Set up Multr and Cloudinary for photos
// 6-11: Get photos to display on website
// 6-11: Find Bootstrap nav bar template
// 6-11: Find Bootstrap card tiles template
// 6-12: Set up O-Auth and login stuff
// 6-12: Sign up for Atlas and host database
// 6-14: Sign up for Heroku, and install: https://git.generalassemb.ly/Flex-322/Heroku_Atlas_Deployment_cheatsheet

const express = require('express')
const path = require('path');
const PORT = 7000
const app = express()
const attractionRoutes = require('./routes/attractionRoutes')
const commentRoutes = require('./routes/commentRoutes')
const methodOverride = require('method-override')

// Require DB connection
require('./db/connection')

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares start here
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// Middlewares end here

// Routes start here
app.use('/attractions', attractionRoutes)
// app.use('/comments', commentRoutes)

// Routes ened here

app.listen(PORT, ()=> {
    console.log(`Listening on PORT ${PORT}`)
})