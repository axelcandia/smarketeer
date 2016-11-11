var integrations  	 = require("../controllers/integrations.server.controller");
var VerifyUser		 = require('../controllers/user').VerifyUser;

var	passport = require('passport');
var passportConfig	  = require("../../config/passport");

module.exports = function(app){
	app.get("/home/integrations*",integrations.RenderIntegrations);  

	//Facebook integrations
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'ads_management,manage_pages,ads_read' }));
	app.get('/auth/facebook/callback',
		 passport.authenticate('facebook', { session: false }),
		  function(req, res,next) { 
		  	req.session['token'] = req.newToken;
		  	res.redirect('/integrations/facebook');
		  });
	app.post('/auth/unlink',integrations.DeleteIntegration);
	app.get('/integrations/facebook',integrations.RenderSetPageIntegration);
	app.post('/integrations/SetIntegration',integrations.SetIntegration);
	app.get("/integrations/trash",integrations.trash);
}