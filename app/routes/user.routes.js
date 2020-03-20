require('../../Services/passport');
const requireAuth = passport.authenticate('jwt', { session : false });
const requireSignin = passport.authenticate('local', { session: false });
const users = require('../controllers/user.controller.js');

module.exports = (app) => {
    
    // Create a new User
    app.signup('/users',requireAuth, users.create);

    // Retrieve all Users
    app.get('/users',requireAuth, users.findAll);

    // Retrieve a single User with userId
    app.get('/users/:userId',requireAuth, users.findOne);

    // Update a User with userId
    app.put('/users/:nuserId',requireAuth, users.update);

    // Delete a User with userId
    app.delete('/users/:userId',requireAuth, users.delete);
}