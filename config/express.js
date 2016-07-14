var config 			  = require('./config');
var express           = require('express');
var session           = require('express-session')
var expressValidator  = require('express-validator');
var path              = require('path');
var MongoStore        = require('connect-mongo')(session);
var multer            = require('multer');
var upload            = multer({ dest: path.join(__dirname, 'uploads') });
var compress          = require('compression');
var logger            = require('morgan');
var bodyParser        = require('body-parser'); 
var dotenv            = require('dotenv');
//TODO: Delte this element later

var methodOverride    = require('method-override');
var cookieParser      = require('cookie-parser');
var errorHandler      = require('errorhandler');
var flash             = require('express-flash');
var passport          = require('passport');
module.exports = function() {
	var app = express(); 

	app.set('views', path.join(__dirname, '../app/views'));
	app.set('view engine', 'jade');
	app.use(compress());
	/*app.use(sass({
	  src: path.join(__dirname, 'public'),
	  dest: path.join(__dirname, 'public'),
	  sourceMap: true
	}));*/
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(expressValidator());
	app.use(methodOverride());
	app.use(cookieParser());
	app.use(session({
	  resave: true,
	  saveUninitialized: true,
	  secret: config.secret,
	  store: new MongoStore({
	    url: config.db,
	    autoReconnect: true
	  })
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());
	//Acces everyone to user information
	app.use(function(req, res, next) {
	  res.locals.user = req.user;
	  next();
	});

	 //All the paths
	 require('../app/routes/else.server.route.js')     (app);
	 require('../app/routes/home.server.route.js')     (app); 
	 require('../app/routes/visits.server.route.js')   (app);
	 require("../app/routes/campaign.server.route.js") (app);
	 require("../app/routes/form.server.route.js") 	   (app);
	 require("../app/routes/leads.server.route.js")    (app);
	 require("../app/routes/sales.server.route.js")    (app); 
	 require("../app/routes/visitorProfile.server.route.js") (app);

	app.use(express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 })); 
	app.use(errorHandler());

	/**
	 * Paths
	 */
	 
	 
	return app;
};