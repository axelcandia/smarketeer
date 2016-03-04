process.env.NODE_ENV =/* process.env.NODE_ENV || */'production';
/**
 * Module dependencies.
 */
var express           = require('express');
var cookieParser      = require('cookie-parser');
var compress          = require('compression');
var session           = require('express-session');
var bodyParser        = require('body-parser');
var logger            = require('morgan');
var errorHandler      = require('errorhandler');
var lusca             = require('lusca');
var methodOverride    = require('method-override');
var dotenv            = require('dotenv');
var MongoStore        = require('connect-mongo/es5')(session);
var flash             = require('express-flash');
var path              = require('path');
var mongoose          = require('mongoose');
var passport          = require('passport');
var expressValidator  = require('express-validator');
var sass              = require('node-sass-middleware');
var multer            = require('multer');
var upload            = multer({ dest: path.join(__dirname, 'uploads') });
var mongoose          = require('./app/config/mongoose');


var db = mongoose();
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 *
 * Default path: .env (You can remove the path argument entirely, after renaming `.env.example` to `.env`)
 */
dotenv.load({ path: '.env.example' });
/**
 * Controllers (route handlers).
 */
var homeController = require('./app/controllers/home');
var userController = require('./app/controllers/user');
var apiController = require('./app/controllers/api');
var contactController = require('./app/controllers/contact');

/**
 * API keys and Passport configuration.
 */
var passportConfig = require('./app/config/passport');

/**
 * Create Express server.
 */
var app = express();

/**
 * Connect to MongoDB.
 */

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 1337);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
  if (req.path === '/api/upload') {
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(function(req, res, next) {
  if (/api/i.test(req.path)) {
    req.session.returnTo = req.path;
  }
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

/**
 * API examples routes.
 */
app.get('/api/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);
app.get('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTwitter);
app.post('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.postTwitter);
app.get('/api/linkedin', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getLinkedin);

/**
 * OAuth authentication routes. (Sign in)
 */ 
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
}); 
app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
}); 



//EDITI THIS ASAP

app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);

app.get('/home', function (req, res) {
    res.render("home/index");
  });
  app.get('/home/funnel/leads',function (req,res){
      res.render("home/funnel/leads");
    });
    app.get('/home/funnel/sales',function (req,res){
      res.render("home/funnel/sales");
    });
    app.get('/home/funnel/visitors',function (req,res){
      res.render("home/funnel/visitors");
    }); 



  app.get('/',function (req,res){
    res.render("intro");
  }); 
  app.get('/home/campaign-builder',function (req,res){ 
    res.render("home/campaign-builder");
  }); 
  /*
    FORMS
  */
  app.get('/home/allforms',function (req,res){
    res.render("home/allforms");
  }); 
  app.get('/home/forms/formbuilder',function (req,res){
    res.render("home/forms/formbuilder");
  });  

  /*
    Dashboards and other in home
  */
  app.get('/home/costs',function (req,res){
    res.render("home/costs");
  }); 
  app.get('/home/MyPlan',function (req,res){
    res.render("home/MyPlan");
  });

  app.get('/home/reporting',function (req,res){
    res.render("home/reporting");
  });
   
  /*
    User
  */
  app.get('/user/costs', function (req, res) {
    res.render("user/costs");
  });
  app.get('/user/MyPlan', function (req, res) {
    res.render("user/MyPlan");
  });
  app.get('/user/MyProfile', function (req, res) {
    res.render( "user/MyProfile");
  });

/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
