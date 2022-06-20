const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleID: String

    // Best option: When you save the comment, you apply the attraction ID to the comment
    // In-between option: keep embedding in Attraction, update comment schema to have userID****
    // Anytime you wanted to see all comments for a user, you could write a function for the query (where all match a certain user ID)
})

const User = mongoose.model("User", UserSchema)

module.exports = User