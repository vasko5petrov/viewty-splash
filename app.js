const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const expressValidator = require('express-validator')

const app = express();

const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
let db = mongoose.connection;

// Check connection
db.once('open', () => {
    console.log('Connected to Database');
});

// Check for DB errors
db.on('error', (err) => {
    console.log(err.errmsg);
});

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: true}));
// Parse application/json
app.use(bodyParser.json());

// Express Validator
app.use(expressValidator())

// Routes
const index = require('./routes/index');
app.use('/api', index);
// -- Users
const users = require('./routes/users');
app.use('/api/users', users);

// Server PORT
const PORT = process.env.PORT || 4000;

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});