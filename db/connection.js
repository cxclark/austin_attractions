// Require Mongoose:
const mongoose = require('mongoose')


const dbURI = process.env.MONGO_URI || `mongodb://${dbConfig.HOST}:${db.config.PORT}/${dbConfig.DB}`

// Connect to attractions database
mongoose.connect(dbURI, {
    useNewUrlParser: true,
})

const db = mongoose.connection

db.on('connected', () => {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})