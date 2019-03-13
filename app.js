const express = require('express');


const app = express();


// --- Body Parser Middleware ---
// Handle raw JSON data
app.use(express.json());
// Handle form submissions
app.use(express.urlencoded({ extended: true }));



// --- Routes ---
// Index routes
const index = require('./routes/index');
app.use('/api', index);
// Users routes
const users = require('./routes/users');
app.use('/api/users', users);







// Server PORT
const PORT = process.env.PORT || 3000;
// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
