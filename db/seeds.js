// const mongoose = require('./connection');
const dotenv = require('dotenv')
dotenv.config();
require('./connection')
const Attraction = require('../models/attractions');

// Comment this in once User model is created
// const User = require('../models/User');

const attractionSeeds = require('./seeds.json');

// Delete all attractions in the database
Attraction.deleteMany({})

// Comment this in once User model is created
//   .then(() => User.deleteMany({}))

  .then(() => {
      // Return newly inserted attractions into the database
      return Attraction.insertMany(attractionSeeds)
  }).then((attractions)=>{
      console.log(attractions)
  })
  .catch(console.error)
  .finally(() => {
    process.exit();
  });


    // return User.create({ email: 'fake@email.com', name: 'Fake Person' })
    //   .then((user) =>
    //     attractionSeeds.map((bookmark) => ({ ...bookmark, owner: user._id }))
    //   )
    //   .then((bookmarks) => Bookmark.insertMany(bookmarks));
//   })

