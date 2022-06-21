// This file is used to seed the database
// Run it by calling `node db/seeds.js`

// Load environment variables in .env file to make them available
const dotenv = require('dotenv')
dotenv.config();
// Require connection.js
require('./connection')
// Require the Attraction model
const Attraction = require('../models/attractions');

// Require the seed data in seeds.json
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