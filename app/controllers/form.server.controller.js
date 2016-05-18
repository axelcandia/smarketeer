var config			= require("../../config/config");
var Forms 			= require("../models/form.server.model");
/**
* Requires a name to build the form properly
* status is eith:crear when you want to create a new form or cargar wheny ou want to load the data of a previously created one :D
*/
exports.RenderFormBuilder= function(req, res, next){
	if (!req.user) { 
		res.redirect("/login");
	}
	var NewForm = Forms({
		"users":[{
			email: req.user.email,
			_id  : req.user._id,
			access: "Administrator"
		}],
		"date":new Date(),
		"name":req.params.name.replace(/[+]/g, ' ')
	});

	NewForm.save(function(err) {
      if (err) {
      	res.send("-1");
      }
      else{
      	res.render("home/forms/formbuilder/index",{ 
      		Name: NewForm.name,
      		Id: NewForm.id,
      		Action:"crear"
      	})
      }

	});
}

exports.RenderAllForms = function(req, res, next){
	if(!req.user){
		res.redirect("/login");
	}
	res.render("home/forms/viewforms",{

	});
}


function UpdateForm(){

}

function DeleteForm(){

}