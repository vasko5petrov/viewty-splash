const express = require('express');
const router = express.Router();

// Register route
router.post('/register', function (req, res) {
    let newUser = {
        name: req.body.firstName + " " + req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        password2: req.body.password2
    };

    res.status(200).json({user: newUser, message: "Register route"});
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
