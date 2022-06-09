const mongoose = require('mongoose')

const AttractionSchema = new mongoose.Schema({
    title: String,
    address: String,
    description: String,
    // comments: [CommentSchema]
    // img:
    // {
    //     // From https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
    //     // Not sure if this is accurate
    //     data: Buffer,
    //     contentType: String
    // }
})

const Attraction = mongoose.model("Attraction", AttractionSchema)

module.exports = Attraction