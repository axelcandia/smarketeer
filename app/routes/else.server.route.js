//var users = require('controllers/users.server.controller'),
var	passport = require('passport');
/**
 * Controllers (route handlers).
 */ 
var userController    = require('../controllers/user');
var apiController     = require('../controllers/api');
var contactController = require('../controllers/contact'); 
var passportConfig	  = require("../../config/passport");
module.exports = function(app) { 
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
	app.get('/auth/google', 
		passport.authenticate('google')); 
	app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
	  res.redirect(req.session.returnTo || '/home');
	});
	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
	  res.redirect(req.session.returnTo || '/');
	});
	app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
	app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), function(req, res) {
	  res.redirect(req.session.returnTo || '/');
	});
 

	//app.post('/login', userController.postLogin);

	//EDITI THIS ASAP

	app.get('/login', userController.getLogin);
	app.post('/login', userController.postLogin);
 
	 
	    app.get('/home/funnel/sales',function (req,res){
	      res.render("home/funnel/sales");
	    });
	    
	  app.get('/',function (req,res){
	    res.render("intro");
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
};