'use strict';



require('dotenv').config();



const express = require('express');
let app = express();

const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/costumes_prod', {useMongoClient: true});


app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials',  true);
  req.header('Access-Control-Request-Headers', 'Authorization, Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  next();
});

app.use('/api', require(__dirname + '/../routes/auth-routes'));
app.use('/api', require(__dirname + '/../routes/accessory-routes'));
app.use('/api', require(__dirname + '/../routes/costume-routes'));

app.use('*', (req, res, next) => {

  next(404, 'Page Does Not Exist');

});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send(err || 'server error');
});

let isRunning = false;
let http = null;

module.exports = {
  start: (port) => {
    let usePort = port || process.env.PORT;
    if ( isRunning ) {
      throw Error ('server is already running');
    }
    http = app.listen(usePort, () => {
      isRunning = true;
      console.log('server running on port ', usePort);
    });
  },


  stop: () => {
    if(! isRunning) {
      throw Error('server is already off');
    }
    if ( ! http ) {
      throw Error('invalid server');
    }

    http.close( () => {
      http = null;
      isRunning = false;
      console.log('server stopped');
    });
  },
};
