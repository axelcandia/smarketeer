var config 			= require('./config'),  
	passport 		= require('passport');

var http 			= require('http');
var express 		= require('express');
var session 		= require('express-session');
var bodyParser 		= require('body-parser');
var errorHandler 	= require('errorhandler');
var cookieParser 	= require('cookie-parser');
var MongoStore 		= require('connect-mongo')(session);
var path    		= require("path");



module.exports = function() {
	var app = express();  

	app.set('views', './app/views');
	app.set('view engine', 'jade');//TODO
	app.set('view options', {
	    layout: false
	});  

	/*
		LOG IN
	*/  
	app.set('view engine', 'jade');
	app.use(cookieParser());
	app.use(session({
		secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
		proxy: true,
		resave: true,
		saveUninitialized: true,
		store: new MongoStore({ host: 'localhost', port: 27017, db: 'node-login'})
		})
	);
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	  
	require('../app/routes/account.server.routes.js')(app);
	//require('../app/routes/funnel.server.routes.js')(app);
	//require('../app/routes/dashboard.server.routes.js')(app); 
	app.use(express.static('./public'));

	return app;
};
