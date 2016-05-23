var formController = require("../controllers/form.server.controller");

module.exports = function(app) {
	app.get('/home/allforms',formController.RenderGetAllForms); 
	app.get('/home/forms/formbuilder/:name',formController.RenderFormBuilder);
	app.get('/home/forms/formbuilder/:name/:id',formController.RenderFormBuilder);
	app.post("/home/forms/UpdateForm/:",formController.UpdateForm);
	app.post("/ReceiveForms*",formController.ReceiveForms);
}; 