// Bring in attraction model
const Attraction = require('../models/attractions')

// Index = get all attractions
let index = (req, res) => {
    // Respond with the attractions
    Attraction.find({}, (err, attractions) => {
        res.render('attractions/index', {attractions})
        // if(err){
        //     res.status(400).json(err)
        //     return
        // }
        // res.json(attractions)
    })
}

// Show = show details of one attraction
let show = (req, res) => {
    Attraction.findById({_id: req.params.id}, (err, attraction) => {
        res.render('attractions/show', {attraction})
        // if(err){
        //     res.status(400).json(err)
        //     return
        // }
        // res.json(attraction)
    })
}

// New = render form to create new attraction
let showNewForm = (req, res) => {
    res.render('attractions/new')
}

// Create = create a new attraction in teh database
let create = (req, res) => {
    const attraction = new Attraction(req.body);
    attraction.save(function (err) {
        if(err) return res.redirect('/attractions/new');
        res.redirect('/attractions');
    })
    // Attraction.create(req.body, (err, attraction) => {
        // if(err){
        //     res.status(400).json(err)
        //     return
        // }
        // res.json(attraction)
    // })
}

// Delete = delete one attraction
// HOW DO I REWRITE THIS USING THE CALLBACK SYNTAX?
async function deleteAttraction(req, res) {
    await Attraction.findByIdAndDelete(req.params.id)
    res.redirect('/attractions')
}

// Show update form to update an attraction
let showUpdateForm = (req, res) => {
    Attraction.findById(req.params.id, (err, attraction) => {
        res.render('attractions/edit', {attraction})
    })
}


// Update = update an attraction in the database
// HOW DO I REWRITE THIS USING THE CALLBACK SYNTAX?
// CAN THE EDIT FUNCTION IGNORE EMPTY FIELDS?
async function update(req, res) {
    await Attraction.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/attractions/${req.params.id}`)
}
// let update = (req, res) => {
//     for (const key in req.body) {
//         if (req.body[key] === '') delete req.body[key];
//     }
    // Attraction.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, attraction) => {
    //     if(err){
    //         res.status(400).json(err)
    //     }
    //     res.json(attraction)
    // })
// }


module.exports  = {
    index,
    showNewForm,
    create,
    show,
    deleteAttraction,
    showUpdateForm,
    update
}