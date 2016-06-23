var salesController = require("../controllers/sales.server.controller");
var VerifyUser		 = require('../controllers/user').VerifyUser;
module.exports = function(app) { 
	app.get( "/funnel/sales*",VerifyUser, salesController.RenderSales );
	app.post( "/home/funnel/GetSales*",salesController.GetSales );
	app.post("/home/CountSales*",salesController.CountSales);
	app.post("/home/GetSalesByChannel*",salesController.GetSalesByChannel); 
};