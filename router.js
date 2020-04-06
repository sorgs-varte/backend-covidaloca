const passport = require('passport');
require('./Services/passport');
const cors = require('cors');
const requireAuth = passport.authenticate('jwt', { session : false });
const requireSignin = passport.authenticate('local', { session: false });
const users = require('./app/controllers/user.controller.js');
const bodyParser = require('body-parser');
const categories = require('./app/controllers/category.controller.js');
const activities = require('./app/controllers/activity.controller.js');

module.exports = (app) => {


    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:443');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);

        next();
    });
    app.use(cors());
    app.use(bodyParser({limit: '500mb'}));
    app.use(bodyParser.json({type: '*/*'}));
    app.use(bodyParser.json({limit: '500mb'}));
    app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));

    // Create a new User
    app.post('/signup', users.signup);

    app.post('/login', users.login);

    // Create a new category
    app.post('/categories',requireAuth, categories.create);

    // Retrieve all categories
    app.get('/categories',requireAuth, categories.findAll);


    // Create a new activity
    app.post('/activities',requireAuth, activities.create);

    // Retrieve all activities
    app.get('/activities',requireAuth, activities.findAll);

    // Retrieve a single activity with activityId
    app.get('/activities/:activityId',requireAuth, activities.findOne);

    // Update a activity with activityId
    app.put('/activities/:activityId',requireAuth, activities.update);

    // Delete a activity with activityId
    app.delete('/activities/:activityId',requireAuth, activities.delete);
};