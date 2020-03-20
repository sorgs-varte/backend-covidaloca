const Activity = require('../models/activity.model.js');

// Create and Save a new activity
exports.create = (req, res) => {
    // Validate request
    if(!req.body.label) {
        return res.status(400).send({
            message: "The label can not be empty"
        });
    }
    if(!req.body.description) {
        return res.status(400).send({
            message: "The description can not be empty"
        });
    }
    if(!req.body.author) {
        return res.status(400).send({
            message: "The author can not be empty"
        });
    }
    
    // Create an activity
    const activity = new Activity({
        label: req.body.label, 
        description: req.body.description,
        author: req.body.author,
        date: Date.now()
    });

    //Save the activity in the database
    activity.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the activity."
        });
    });
};

// Retrieve and return all activities from the database.
exports.findAll = (req, res) => {
    Activity.find()
    .then(activities => {
        res.send(activities);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving activities."
        });
    });
};

// Find a single category with a activityId
exports.findOne = (req, res) => {
    Activity.findById(req.params.activityId)
    .then(activity => {
        if(!activity) {
            return res.status(404).send({
                message: "activity not found with id " + req.params.activityId
            });            
        }
        res.send(activity);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "activity not found with id " + req.params.activityId
            });                
        }
        return res.status(500).send({
            message: "activity retrieving user with id " + req.params.activityId
        });
    });
};

// Update an activity identified by the activityId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.label) {
        return res.status(400).send({
            message: "The label can not be empty"
        });
    }
    if(!req.body.description) {
        return res.status(400).send({
            message: "The description can not be empty"
        });
    }
    if(!req.body.author) {
        return res.status(400).send({
            message: "The author can not be empty"
        });
    }

    // Find activity and update it with the request body
    Activity.findByIdAndUpdate(req.params.activityId, {
        label: req.body.label, 
        description: req.body.description,
        author: req.body.author,
        dislike:{
        }
    }, {new: true})
    .then(activity => {
        if(!activity) {
            return res.status(404).send({
                message: "activity not found with id " + req.params.activityId
            });
        }
        res.send(activity);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "activity not found with id " + req.params.activityId
            });                
        }
        return res.status(500).send({
            message: "Error updating activity with id " + req.params.activityId
        });
    });
};

//Delete a category with the specified activityId in the request
exports.delete = (req, res) => {
    Activity.findByIdAndRemove(req.params.activityId)
    .then(activity => {
        if(!activity) {
            return res.status(404).send({
                message: "activity not found with id " + req.params.activityId
            });
        }
        res.send({message: "activity deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "activity not found with id " + req.params.activityId
            });                
        }
        return res.status(500).send({
            message: "Could not delete activity with id " + req.params.activityId
        });
    }); 
};
