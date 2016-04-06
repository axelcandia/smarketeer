var mongoose          = require('mongoose');

//var sass              = require('node-sass-middleware');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config'),
  mongoose = require('./config/mongoose'),
  express = require('./config/express'),
  passport = require('./config/passport');

var db 			= mongoose();
var app 		= express(); 

app.listen(config.port, function() {
  console.log('Express server listening on port %d in %s mode', config.port, process.env.NODE_ENV);
});

module.exports = app;