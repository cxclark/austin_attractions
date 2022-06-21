// Bring in attraction model
const Attraction = require('../models/attractions')
// Require path to enable working with the file system
const path = require('path');
// Require Cloudinary
const cloudinary = require('../utils/cloudinary');


// Index = get all attractions
let index = (req, res, next) => {
    // Respond with the attractions
    Attraction.find({}, (err, attractions) => {
        res.render('attractions/index', {
            attractions,
            user: req.user
        });
    });
}

// Show = show details of one attraction
let show = (req, res, next) => {
    // Populates the data associated with user's database ID 
    Attraction.findById(req.params.id).populate({
         path:'comments', 
         populate:{path: 'userID', model:'User'} })
        .exec( (err, attraction) => {
            if(err){
                res.status(400).json(err)
                return
            }
            res.render('attractions/show', {attraction, user: req.user})
    });
}

// New = render form to create new attraction
let showNewForm = (req, res, next) => {
    res.render('attractions/new', {user: req.user})
}

// Create = create a new attraction in the database
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
    } catch (err) {
        console.log(err);
    }
    res.redirect('/attractions')
}

// Delete = delete one attraction
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
    res.redirect('/attractions')
}

// Show update form to update an attraction
let showUpdateForm = (req, res, next) => {
    Attraction.findById(req.params.id, (err, attraction) => {
        res.render('attractions/edit', {attraction, user: req.user})
    })
}

// Update = update an attraction in the database
async function update(req, res) {
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path)
        req.body["image"] = result.secure_url
        req.body["cloudinary_id"] = result.public_id
    } else {
        delete req.body["image"]
    }
    await Attraction.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/attractions/${req.params.id}`)
}

module.exports  = {
    index,
    showNewForm,
    create,
    show,
    deleteAttraction,
    showUpdateForm,
    update
}