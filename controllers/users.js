const { check, validationResult } = require('express-validator/check');
const parseErrors = require('../utils/parseErrors');
const User = require('../models/user');

module.exports.validate = (method) => {

switch (method) {

    case 'createUser': {
      return [
            check('firstName').not().isEmpty().withMessage("First name is required."),
            check('lastName').not().isEmpty().withMessage("Last name is required."),
            check('email').not().isEmpty().withMessage("Email is required."),
            check('email', 'Please enter a valid email format.')
                .optional({ checkFalsy: true })
                .isEmail()
                .custom((value, { req }) => {
                    return new Promise((resolve, reject) => {
                        User.findOne({ 'email': value }, (err, user) => {
                        if(user !== null) {
                            return reject();
                        } else {
                            return resolve();
                        }
                        });
                    });
                }).withMessage('This email is already in use'),
            check('username').not().isEmpty().withMessage("Username is required."),
            check('username')
                .custom((value, { req }) => {
                    return new Promise((resolve, reject) => {
                        User.findOne({ 'username': value }, (err, user) => {
                        if(user !== null) {
                            return reject();
                        } else {
                            return resolve();
                        }
                        });
                    });
                }).withMessage('This username is already in use'),
            check('password').not().isEmpty().withMessage("Password is required."),
            check('password', 'Password must contains 8-25 signs (numbers and letters)')
                .optional({ checkFalsy: true })
                .isLength({ min: 8 })
                .matches(/^[0-9a-zA-Z]{8,}/),
            check('password2').not().isEmpty().withMessage("Password confirmation is required."),
            check('password2', 'Passwords does not match')
                .exists()
                .custom((value, { req }) => value === req.body.password)
        ]
    }
  }
}

module.exports.createUser = (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: parseErrors(errors.mapped())});
    } else {
        let newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            password2: req.body.password2
        });

        User.addUser(newUser, (err, user) => {
            if(err) return res.status(401).json({errors: err});
            return res.status(201).json({user: user, message: "User registered"});
        });
    }
}