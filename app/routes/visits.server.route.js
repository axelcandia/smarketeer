var visitsController = require("../controllers/visits.server.controller"); 
var VerifyUser		 = require('../controllers/user').VerifyUser;
module.exports = function(app) { 
	app.get( "/funnel/visitors/",VerifyUser, visitsController.RenderVisitors );
	app.post( "/home/funnel/GetMoreVisitors*",visitsController.GetMoreVisitors ); 
	app.post("/home/CountVisitors*",visitsController.CountVisitors);
		app.post("/visitors/Export*",visitsController.Export);
};