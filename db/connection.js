// Require Mongoose:
const mongoose = require('mongoose')

// Connect to attractions database
mongoose.connect('mongodb://localhost:27017/attractions', {
    useNewUrlParser: true
})

const db = mongoose.connection

db.on('connected', () => {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})