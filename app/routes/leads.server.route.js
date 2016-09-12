var leadsController  = require("../controllers/leads.server.controller");
var VerifyUser		 = require('../controllers/user').VerifyUser;
module.exports = function(app) { 
	 app.get('/funnel/leads/*',VerifyUser,leadsController.RenderLeads); 
	 app.post("/home/CountLeads*",leadsController.CountLeads);
	 app.post("/home/funnel/SetCosts*",leadsController.SetCosts);
	 app.post("/home/funnel/GetLeads*",leadsController.GetLeads); 
	 app.post("/home/GetLeadsByChannel*",leadsController.GetLeadsByChannel);
	 app.post("/home/funnel/leads/GetSale*",leadsController.GetSale);
	 app.post("/leads/Export*",leadsController.Export);
};