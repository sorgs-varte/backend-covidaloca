require('../../Services/passport');
const requireAuth = passport.authenticate('jwt', { session : false });
const requireSignin = passport.authenticate('local', { session: false });
const activities = require('../controllers/activity.controller.js');

module.exports = (app) => {

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
}