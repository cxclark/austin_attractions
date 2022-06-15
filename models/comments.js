const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {type: String, required: true},
    rating: {type: Number, min: 1, max: 5, default: 5},
    // userID:
    
    // Comment schema is embedded in Attraction schema
    // Moving forward, would use have key for comment ID in commentSchema, the RDS way
    // Best option (1): When you save the comment, you apply the attraction ID to the comment
    // In-between option (2): keep embedding in Attraction, update comment schema to have userID****
    // Anytime you wanted to see all comments for a user, you could write a function for the query (where all match a certain user ID)
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = {
    commentSchema,
    Comment
}