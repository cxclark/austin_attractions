const mongoose = require('mongoose')
const {commentSchema} = require('./comments')

const AttractionSchema = new mongoose.Schema({
    title: String,
    address: String,
    description: String,
    image: String,
    cloudinary_id: String,
    // Comment schema is embedded in Attraction schema
    // Moving forward, would use key for comment ID in commentSchema, the RDS way
    comments: [commentSchema]
})

const Attraction = mongoose.model("Attraction", AttractionSchema)

module.exports = Attraction