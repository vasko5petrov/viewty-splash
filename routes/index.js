const express = require('express');
const router = express.Router();


// Index route
router.get('/', function (req, res) {
    res.status(200).json({message: "Index route"});
});


module.exports = router;
