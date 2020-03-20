require('../../Services/passport');
const requireAuth = passport.authenticate('jwt', { session : false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
    const categories = require('../controllers/category.controller.js');

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
}