var config 			= require('./config'),
	express 		= require('express'),
	bodyParser 		= require('body-parser'),
	passport 		= require('passport'),
	flash 			= require('connect-flash'), 
	cookieParser 	= require('cookie-parser');
	cookieSession 	= require('cookie-session');

module.exports = function() {
	var app = express();

	app.use(bodyParser.urlencoded({
		extended: true
	})); 
	app.use(bodyParser.json());
 

	app.set('views', './app/views');
	app.set('view engine', 'jade');//TODO

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session()); 
 	app.use(cookieSession({ secret: 'tobo!', cookie: { maxAge: 60 * 60 * 1000 }}));
	app.use(cookieParser());
 
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/dashboard.server.routes.js')(app);

	app.use(express.static('./public'));

	return app;
};
