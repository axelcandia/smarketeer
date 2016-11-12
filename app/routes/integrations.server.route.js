var integrations  	 = require("../controllers/integrations.server.controller");
var VerifyUser		 = require('../controllers/user').VerifyUser;
var	passport = require('passport');
var passportConfig	  = require("../../config/passport");

module.exports = function(app){
	app.get("/home/integrations*",integrations.RenderIntegrations);  

	//Facebook integrations
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['ads_management','manage_pages','ads_read'] }));
	app.get('/auth/facebook/callback',
		 passport.authenticate('facebook', { session: false }),
		  function(req, res,next) { 
		  	req.session['token']  = req.newToken;
		  	req.session['source'] = "facebook";
		  	res.redirect('/integrations/SetPageIntegration');
		  });

	app.get('/auth/hubspot', passport.authenticate('hubspot', { portalId: 2668812, scope: ['offline',"contacts-rw" ] }));

	app.get('/auth/hubspot/callback', function(req, res) {
	    req.session['token'] = req.query.access_token;
	    req.session['source'] = "hubspot";
	    // Redirect to home.
	    console.log(req.query);
	    //res.redirect('/integrations/step2');
	});
	app.post('/auth/unlink',integrations.DeleteIntegration);
	app.get('/integrations/SetPageIntegration',integrations.RenderSetPageIntegration);
	app.post('/integrations/SetIntegration',integrations.SetIntegration);
	app.get("/integrations/trash",integrations.trash);

	app.post('/integrations/hubspotwebhook',integrations.hubspotwebhook);
}