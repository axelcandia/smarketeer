var salesController = require("../controllers/sales.server.controller");

module.exports = function(app) { 
	app.get( "/home/funnel/sales", salesController.RenderSales );
	app.post( "/home/funnel/GetSales*",salesController.GetSales );
	app.post("/home/CountSales*",salesController.CountSales);
	app.post("/home/GetSalesByChannel*",salesController.GetSalesByChannel); 
};