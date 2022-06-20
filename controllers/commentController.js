const Attraction = require('../models/attractions')

let create = (req, res) => {
    console.log(req.params)
    Attraction.findById(
        req.params.id,
        function (err, attraction) {
            console.log(req.body)
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
//     Comment.create(req.body, (err, comment) =>{
//         if(err){
//             res.status(400).json(err)
//             return
//         }
//         res.json(comment)
//     })
// }

module.exports = {
    create
}