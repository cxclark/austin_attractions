const Comment = require('../models/comments')

let create = (req, res) => {
    Comment.create(req.body, (err, comment) =>{
        if(err){
            res.status(400).json(err)
            return
        }
        res.json(comment)
    })
}

module.exports = {
    create
}