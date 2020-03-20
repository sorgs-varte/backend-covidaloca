const passport = require('passport');
require('./Services/passport');
const requireAuth = passport.authenticate('jwt', { session : false });
const requireSignin = passport.authenticate('local', { session: false });
const users = require('./app/controllers/user.controller.js');
const categories = require('./app/controllers/category.controller.js');
const activities = require('./app/controllers/activity.controller.js');

module.exports = (app) => {

    // Create a new User
    app.post('/signup', users.signup);

    // Retrieve all Users
    /*app.get('/users',requireAuth, users.findAll);

    // Retrieve a single User with userId
    app.get('/users/:userId',requireAuth, users.findOne);

    // Update a User with userId
    app.put('/users/:nuserId',requireAuth, users.update);

    // Delete a User with userId
    app.delete('/users/:userId',requireAuth, users.delete);*/


    // Create a new category
    app.post('/categories',requireAuth, categories.create);

    // Retrieve all categories
    app.get('/categories',requireAuth, categories.findAll);

    // Retrieve a single category with categoryId
    app.get('/categories/:categoryId',requireAuth, categories.findOne);

    // Update a category with categoryId
    app.put('/categories/:categoryId',requireAuth, categories.update);

    // Delete a category with categoryId
    app.delete('/categories/:categoryId',requireAuth, categories.delete);



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