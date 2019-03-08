const express = require('express');
const router = express.Router();

const parseErrors = require('../utils/parseErrors');
const checkUserFormFields = require('../utils/checkUserFormFields');
const _ = require('lodash');
const User = require('../models/user');

// Register route
router.post('/register', (req, res) => {

    let newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        password2: req.body.password2
    }

    let emptyFields = checkUserFormFields(newUser);

    newUser = new User(newUser);
   
    User.addUser(newUser, (err, user) => {
        if(err && !_.isEmpty(emptyFields.errors)) {
            return res.status(400).json({errors: {...parseErrors(err.errors), ...emptyFields.errors}});
        } else if(!err && !_.isEmpty(emptyFields.errors)) {
            return res.status(400).json({errors: emptyFields.errors});
        } else if(err && _.isEmpty(emptyFields.errors)) {
            return res.status(400).json({errors: parseErrors(err.errors)});
        } else {
            return res.status(200).json({user: user, message: "User registered"});
        }
    });
});

// Auth route
router.post('/authenticate', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;

    res.status(200).json({user: {email, password}, message: "Auth route"});
});

// Profile route
router.get('/profile', function (req, res) {
    res.status(200).json({message: "Profile route"});
});

module.exports = router;
