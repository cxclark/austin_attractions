const dotenv = require('dotenv')
dotenv.config();
require('./connection')
const Attraction = require('../models/attractions');

const attractionSeeds = require('./seeds.json');

// Delete all attractions in the database
Attraction.deleteMany({})

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