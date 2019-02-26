//npm run server - for (nodemon app) start
//npm start - for (node app) start

const express = require('express');
const routes = require('./routes/api') 

const app = express();

app.use(routes);

app.listen(process.env.PORT || 3000, function(){
    console.log('Now listening on port 3000.');
});
