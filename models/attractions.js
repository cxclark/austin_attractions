const mongoose = require('mongoose')
const {commentSchema} = require('./comments')

const AttractionSchema = new mongoose.Schema({
    title: String,
    address: String,
    description: String,
    image: String,
    cloudinary_id: String,
    // comments: [commentSchema]
    // comments: {
    // }
    // When you save the comment, you apply the attraction ID to the comment
    // In-between option: keep embedding in Attraction, update comment schema to have userID****
    // Anytime you wanted to see all comments for a user, you could write a function for the query (where all match a certain user ID)
})

const Attraction = mongoose.model("Attraction", AttractionSchema)

module.exports = Attraction