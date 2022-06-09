const express = require('express')
const PORT = 7000
const app = express()
const attractionRoutes = require('./routes/attractionRoutes')

// Require DB connection
require('./db/connection')

// Middlewares start here
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Middlewares end here

// Routes start here
app.use('/attractions', attractionRoutes)


// Routes ened here

app.listen(PORT, ()=> {
    console.log(`Listening on PORT ${PORT}`)
})