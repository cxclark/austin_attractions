const mongoose = require('mongoose')

const commentSchema = new mongoose.SchemaType({
    content: {type: String, required: true},
    rating: {type: Number, min: 1, max: 5, default: 5}
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment