const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: true}));
// Parse application/json
app.use(bodyParser.json());

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