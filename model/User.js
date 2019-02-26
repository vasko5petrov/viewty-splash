const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;


/*

///           база


mongodb://vladiv:vladi123@ds161024.mlab.com:61024/viewty






const mongoose = require('mongoose');
mongoose.Promise = Promise;

const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database, {useNewUrlParser: true});
let db = mongoose.connection;

// Check connection
db.once('open', () => {
    console.log('Connected to Database');
});

// Check for DB errors
db.on('error', (err) => {
    console.log(err.errmsg);
});
*/