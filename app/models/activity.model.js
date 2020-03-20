const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
    label: String,
    description: String,
    author: String,
    date: Date,
    like : {
        authors: Array
    },
    dislike:{
        authors: Array
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Activity', ActivitySchema);