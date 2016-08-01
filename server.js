var mongoose          = require('mongoose');

//var sass              = require('node-sass-middleware');

var fs 			= require('fs');
var http 		= require('http');
var https 		= require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config 	 = require('./config/config'),
  	mongoose = require('./config/mongoose'),
  	express  = require('./config/express'),
  	passport = require('./config/passport');

var db 			= mongoose();
var app 		= express(); 

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(config.port, function() {
  console.log('Express server listening on port %d in %s mode', config.port, process.env.NODE_ENV);
});

module.exports = app;