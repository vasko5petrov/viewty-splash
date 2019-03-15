const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

// Register route
router.post('/register', userController.validate('createUser'), userController.createUser);

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
