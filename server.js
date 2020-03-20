const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Bienvenue sur l'API Covid Anim. Amuses-toi, et bon confinement"});
});

// Require Users routes
require('./app/routes/user.routes.js')(app);

// Require category routes
require('./app/routes/category.routes.js')(app);

// Require activity routes
require('./app/routes/activity.routes.js')(app);

// listen for requests
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});