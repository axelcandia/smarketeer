var advertisingController = require("../controllers/advertisingCosts.server.controller");
var VerifyUser		   	  = require('../controllers/user').VerifyUser;

module.exports = function(app) { 
	app.get("/home/costs*",VerifyUser, advertisingController.RenderAdvertisingCosts); 
};