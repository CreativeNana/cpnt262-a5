// Load dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Import seed data 
const dbSeed = require('./seeds/aitoys.js');

// Import model data
const aiToys = require('./models/aitoys.js');


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;

// Set up callback if DB connection fails
db.on('error', function(error){
  console.log(`DB Connection Error: ${error.message}`)
});

// Set up callback if DB connection is successful
db.once('open', function() {
  console.log('Connected to DB...');
});

aiToys.insertMany(dbSeed, function(error, aitoy) {
  console.log('Data import completed.')
  mongoose.connection.close();
});