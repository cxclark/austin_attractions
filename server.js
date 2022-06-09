// Finalize backend schemas
// Create EJS and render pages for website
// Create Partial EJS's for header and footers
// Set up Multr and Cloudinary for photos
// Get photos to display on website
// Find Bootstrap nav bar template
// Find Bootstrap card tiles template
// 


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