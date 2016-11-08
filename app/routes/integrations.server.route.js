var integrations  	 = require("../controllers/integrations.server.controller");
var VerifyUser		 = require('../controllers/user').VerifyUser;

var	passport = require('passport');
var passportConfig	  = require("../../config/passport");

module.exports = function(app){
	app.get("/home/integrations*",integrations.RenderIntegrations);  

	//Facebook integrations
	app.get('/auth/facebook',integrations.SetIntegration, passport.authenticate('facebook', { scope : 'ads_management' }));
	app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { 
            failureRedirect : '/integrations/facebook'
        }));
	app.post('/auth/unlink',integrations.DeleteIntegration);
	app.get('/integrations/facebook',integrations.SetFacebookIntegration);
	app.post('/integrations/SetIntegrationSite',integrations.SetIntegrationSite);
}