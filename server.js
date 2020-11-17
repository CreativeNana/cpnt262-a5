// Load dependencies
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const dotenv = require('dotenv').config();
const cors = require('cors');

// Import models
const aiToys = require(`./models/aitoys.js`);

// Connect to MongoDB
const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });

var db = mongoose.connection;

// Set up callback if DB connection fails
db.on('error', function(error){
  console.log(`DB Connection Error: ${error.message}`)
});

// Set up callback if DB connection is successful
db.once('open', function() {
  console.log('Connected to DB...');
});

// Create express app
const app = express();

// Set view engine
app.set('view engine','ejs')

// CORS
corsOptions = {
  origin: "https://dashboard.heroku.com",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// app.use is for using middleware
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.urlencoded({ extended: true }));

// Display list of data
app.get('/', function(request, response){
  response.send('<h1>Please check the AI Toys list by adding /api/v0/aitoys</h1>');
})

// JSON GET Endpoint: Array Object 
app.get('/api/v0/aitoys', function(request, response){
  aiToy.find(function(error, aitoys) { 
    console.log(aitoys);
    response.json(aitoys);
  });
})

// JSON GET Endpoint: Individual page 
app.get('/api/v0/aitoys/:id', function(request, response){
  let aitoyID = request.parameter.id;
  aiToy.findOne({'id': aitoyID}, function(error, aitoy) {
    if (!aitoy) {
      return response.send('Invalid ID. Please try it again!');
    }
    response.json(aitoy);
  });
})


// Add more middleware
app.use(function(req, res, next) {
  res.status(404);
  res.send('404: File Not Found');
});

// Set port preferrence with default
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
});