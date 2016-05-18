var formController = require("../controllers/form.server.controller");

module.exports = function(app) {
	app.get('/home/allforms',formController.RenderAllForms); 
	app.get('/home/forms/formbuilder/:name',formController.RenderFormBuilder);
};
