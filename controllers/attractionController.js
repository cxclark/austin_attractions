// Bring in attraction model
const Attraction = require('../models/attractions')

// Cloudinary & Multer
// https://www.youtube.com/watch?v=LWB1s6P0wgE&ab_channel=FarhanFarooq
// But moved from Routes to Controller...
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');


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


// Trying to Cloudinary/Multer form of create
async function create(req, res) {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        
        let attraction = new Attraction({
            title: req.body.title,
            address: req.body.address,
            description: req.body.description,
            image: result.secure_url,
            cloudinary_id: result.public_id
        })
        await attraction.save();
        res.json(attraction);

    } catch (err) {
        console.log(err);
    }
}
// // Create = create a new attraction in the database
// let create = (req, res) => {
//     const attraction = new Attraction(req.body);
//     attraction.save(function (err) {
//         if(err) return res.redirect('/attractions/new');
//         res.redirect('/attractions');
//     })
//     // Attraction.create(req.body, (err, attraction) => {
//         // if(err){
//         //     res.status(400).json(err)
//         //     return
//         // }
//         // res.json(attraction)
//     // })
// }

// Delete = delete one attraction
// HOW DO I REWRITE THIS USING THE CALLBACK SYNTAX?
async function deleteAttraction(req, res) {
    try {
        let attraction = await Attraction.findById(req.params.id);
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(attraction.cloudinary_id);
        // Delete attraction from database
        await attraction.remove();
    } catch (err) {
        console.log(err);
    }
    // await Attraction.findByIdAndDelete(req.params.id)
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