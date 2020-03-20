const mongoose = require('mongoose');
const passwordHash = require('password-hash');
const jwt = require('jwt-simple');
const config = require('../../config');

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email : {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
    },
    password : String
}, {timestamps: { createdAt: 'created_at' }
});

UserSchema.methods = {
    authenticate: function (password) {
        return passwordHash.verify(password, this.password);
    },
    getToken: function () {
        return jwt.encode(this, config.secret);
    }
};

module.exports = mongoose.model('User', UserSchema);