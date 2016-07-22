
var reportController  	= require("../controllers/report.server.controller");
var VerifyUser		 	= require('../controllers/user').VerifyUser;
module.exports = function(app) { 

	 app.get('/home/reporting*',VerifyUser,reportController.RenderReport);
	 app.post("/home/reporting/GetReports*",reportController.GetReports);

}