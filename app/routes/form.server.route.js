var formController = require("../controllers/form.server.controller");
//var cors  		   = require('cors'); 
var cors = require('cors')

module.exports = function(app) {
	//Enable the CORS for these ones
	app.options('/ReceiveForms*', cors());
	app.options('/GetFormHTML*', cors());
	app.options('/GetVisitorId*', cors());

	app.get('/home/allforms',formController.RenderGetAllForms); 
	app.get('/home/forms/formbuilder/:name',formController.RenderFormBuilder);
	app.get('/home/forms/formbuilder/:name/:id',formController.RenderFormBuilder);
	app.post('/GetVisitorId*',cors(),formController.GetVisitorId);
	app.post("/GetFormHTML*", cors(), formController.GetFormHTML );
	app.post("/home/forms/UpdateForm*",formController.UpdateForm);
	app.post("/ReceiveForms*", cors(),formController.ReceiveForms);
	app.post("/home/forms/eliminar/:id", formController.DeleteForm );
	app.post("/home/forms/clonar/:id", formController.CloneForm );

}; 
