var formController = require("../controllers/form.server.controller");
//var cors  		   = require('cors'); 
var cors = require('cors')

module.exports = function(app) {
	app.options('/ReceiveForms*', cors());
	app.get('/home/allforms',formController.RenderGetAllForms); 
	app.get('/home/forms/formbuilder/:name',formController.RenderFormBuilder);
	app.get('/home/forms/formbuilder/:name/:id',formController.RenderFormBuilder);
	app.post("/home/forms/UpdateForm*",formController.UpdateForm);
	app.post("/ReceiveForms*", cors(),formController.ReceiveForms);
	app.post("/home/forms/eliminar/:id", formController.DeleteForm );
	app.post("/home/forms/clonar/:id", formController.CloneForm );
}; 
