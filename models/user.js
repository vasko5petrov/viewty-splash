const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, { message: "This {PATH} is already taken"});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.addUser = (newUser, callback) => {
    // Crypt the password and save the user
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) callback({message: 'Failed to register user'}, null);
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}