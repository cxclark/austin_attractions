// Bring in attraction model
const Attraction = require('../models/attractions')

// Index = get all attractions
let index = (req, res) => {
    // Respond with the attractions
    Attraction.find({}, (err, attractions) => {
        if(err){
            res.status(400).json(err)
            return
        }
        res.json(attractions)
    })
}

// Create = create a new attraction in teh database
let create = (req, res) => {
    Attraction.create(req.body, (err, attraction) => {
        if(err){
            res.status(400).json(err)
            return
        }
        res.json(attraction)
    })
}

// Show = show details of one attraction
let show = (req, res) => {
    Attraction.findById({_id: req.params.id}, (err, attraction) => {
        if(err){
            res.status(400).json(err)
            return
        }
        res.json(attraction)
    })
}

// Delete = delete one attraction
let deleteAttraction = (req, res) => {
    Attraction.findByIdAndDelete(req.params.id, (err, attraction) => {
        if(err){
            res.status(400).json(err)
            return
        }
        res.json({message: 'Item Deleted'})
    })
}

// Update = update an attraction in the database
let update = (req, res) => {
    Attraction.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, attraction) => {
        if(err){
            res.status(400).json(err)
        }
        res.json(attraction)
    })
}


module.exports  = {
    index,
    create,
    show,
    deleteAttraction,
    update
}