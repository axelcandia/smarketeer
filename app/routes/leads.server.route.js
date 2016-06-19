
var leadsController = require("../controllers/leads.server.controller");
module.exports = function(app) { 
	 app.get('/home/funnel/leads',leadsController.RenderLeads); 
	 app.post("/home/CountLeads*",leadsController.CountLeads);
	 app.post("/home/funnel/SetCosts*",leadsController.SetCosts);
	 app.post("/home/funnel/GetLeads*",leadsController.GetLeads); 
	 app.post("/home/GetGraphLeads*",leadsController.GetGraphLeads);
	 app.post("/home/funnel/leads/GetSale*",leadsController.GetSale);
};