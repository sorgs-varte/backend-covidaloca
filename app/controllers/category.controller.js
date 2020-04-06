const Category = require('../models/category.model.js');

// Create and Save a new Category
exports.create = (req, res) => {
    // Validate request
    if(!req.body.label) {
        return res.status(400).send({
            message: "The label can not be empty"
        });
    }
    
    // Create a category
    const category = new Category({
        label: req.body.label, 
        description: req.body.description
    });

    //Save the category in the database
    category.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the category."
        });
    });
};

// Retrieve and return all categories from the database.
exports.findAll = (req, res) => {
    Category.find()
    .then(categories => {
        res.send(categories);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving categories."
        });
    });
};