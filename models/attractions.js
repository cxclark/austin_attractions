const mongoose = require('mongoose')
const {commentSchema} = require('./comments')

const AttractionSchema = new mongoose.Schema({
    title: String,
    address: String,
    description: String,
    image: String,
    cloudinary_id: String,
    comments: [commentSchema]
})

const Attraction = mongoose.model("Attraction", AttractionSchema)

module.exports = Attraction