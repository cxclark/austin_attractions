// Require Attraction model
const Attraction = require('../models/attractions')

// Create a new comment associated with the attraction in the database
let create = (req, res) => {
    console.log(req.params)
    Attraction.findById(
        req.params.id,
        function (err, attraction) {
            console.log(req.body)
            // Pass in req.body using spread syntax and userID
            attraction.comments.push({...req.body, userID: req.user._id});
            attraction.save(function(err) {
                if (err) {
                    console.log(err);
                }
                res.redirect(`/attractions/${attraction._id}`);
            });
        }
    );
}

module.exports = {
    create
}