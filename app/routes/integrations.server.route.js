var integrations  = require("../controllers/integrations.server.controller");
var VerifyUser		 = require('../controllers/user').VerifyUser;
module.exports = function(app){
	app.get("/home/integrations*",integrations.RenderIntegrations);
}