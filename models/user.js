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
    User.setPassword(newUser.password)
        .then(hash => {
            newUser.password = hash;
            newUser.save(callback);
        })
        .catch(err => callback(err, null));
}

module.exports.setPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if(err) reject({message: 'Failed to register user'});
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) reject({message: 'Failed to register user'});
                resolve(hash);
            });
        });
    });
}