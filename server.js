// 6-11: Finalize backend schemas
// 6-11: Create EJS and render pages for website
// 6-11: Create Partial EJS's for header and footers
// 6-11: Set up Multr and Cloudinary for photos
// 6-11: Get photos to display on website
// 6-11: Find Bootstrap nav bar template
// 6-11: Find Bootstrap card tiles template
// 6-12: Sign up for Atlas and host database
// 6-12: Sign up for Heroku, and install

const express = require('express')
const PORT = 7000
const app = express()
const attractionRoutes = require('./routes/attractionRoutes')
const commentRoutes = require('./routes/commentRoutes')

// Require DB connection
require('./db/connection')

// Middlewares start here
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Middlewares end here

// Routes start here
app.use('/attractions', attractionRoutes)
app.use('/comments', commentRoutes)

// Routes ened here

app.listen(PORT, ()=> {
    console.log(`Listening on PORT ${PORT}`)
})