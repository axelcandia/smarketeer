var integrations  	 = require("../controllers/integrations.server.controller");
var VerifyUser		 = require('../controllers/user').VerifyUser;

var	passport = require('passport');
var passportConfig	  = require("../../config/passport");

module.exports = function(app){
	app.get("/home/integrations*",integrations.RenderIntegrations);  

	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
	  res.redirect("/ERROR!");
	}); 
}