// Require mongoose
const mongoose = require('mongoose') 

const commentSchema = new mongoose.Schema({
    content: {type: String, required: true},
    rating: {type: Number, min: 1, max: 5, default: 5},
    // Reference the User schema, so it references the ID in the database
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = {
    commentSchema,
    Comment
}