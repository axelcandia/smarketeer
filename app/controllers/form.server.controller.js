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
	//CREATE ONE
	if(!req.params.id){
			var name=req.params.name.replace(/[+]/g, ' ');
			var NewForm = Forms({
			"users":[{
				email: req.user.email,
				_id  : req.user._id,
				access: "Administrator"
			}],
			"date":new Date(),
			"name":name,
			"builderCode":'[{"title":"Form Name","fields":{"name":{"label":"Nombre","type":"input","value":"REEMPLAZAR"}},"fresh":true}]'.replace(/REEMPLAZAR/g, name)
		});

		NewForm.save(function(err) {
	      if (err) {
	      	res.send("-1");
	      }
	      else{
	      	url="/home/forms/formbuilder/"+req.params.name+"/"+NewForm.id;
	      	res.redirect(url);
	      }

		});
	}
	//We have the ID So search it, and find that info :D
	else{
		Forms.findById(req.params.id, function (err, found) {
			if(err)
				console.log("err");
			else{
				console.log(found);
				res.render("home/forms/formbuilder/index",{ 
		      		Name: found.name,
		      		Id: found.id,
		      		builderCode: found.builderCode
	      		});
			}
		}); 
	} 
}

exports.RenderGetAllForms= function(req, res){
	if (!req.user) { 
		res.redirect("/login");
	}
	//GetAllCampaings for these user
	Forms.find({"users._id" : req.user._id},function(err,data){
		if(err)
			console.log(err);
		console.log(data);
		res.render("home/forms/viewforms",{
			forms:data
		});
	});
	//
}

/**
* Update the html and json to the send request
*/
exports.UpdateForm = function ( id, html ){
	Forms.update({_id: id}, {
    	html: html
	}, function(err, affected, resp) {
   		console.log(resp);
	});

}
//DELETE receiver or modify it in the next version :DDD
exports.ReceiveForms = function(req,res,next){
	console.log(JSON.stringify(req.body.id));
	Forms.findByIdAndUpdate(req.body.id, { builderCode:req.body.builderCode }, function (err, tank) {
	  if (err) return handleError(err); 
	  res.send(tank);
	}); 
}
function DeleteForm(){

}