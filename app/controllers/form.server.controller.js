var config			= require("../../config/config");
var Forms 			= require("../models/form.server.model");
var minify 			= require('html-minifier').minify;
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
		      		Name       : found.name,
		      		formId     : found.id,
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

//DELETE receiver or modify it in the next version :DDD
exports.UpdateForm = function(req,res,next){
	console.log(JSON.stringify(req.body.id));
	var send='"Send('+req.body.id+')"';
	//Form it, minify it, sell it
	var html= "<form class='form-horizontal smkt_form' id='"+req.body.id+"'>" +
				req.body.html+
				"<button id='smkt_button' onclick="+send+">Enviar</button>"+
			  "</form>";
	var result = minify(html, {
		  removeAttributeQuotes: false
	});

	Forms.findByIdAndUpdate(req.body.id, { builderCode:req.body.builderCode,html:result }, function (err, tank) {
	  if (err) return handleError(err); 
	  res.send(tank);
	}); 
}
/*
* Receives all the responses from froms
*/
exports.ReceiveForms = function(req,res,next){
	console.log(req.body);
}
/**
* Delete the campaign from our DB
*/
exports.DeleteForm = function(req,res){
	if (!req.user) { 
		res.redirect("/login");
	}
	Forms.findByIdAndRemove(req.params.id,function(err){
		if(err)
			res.send("false");
		else
			res.send("true");

	})
}
/**
* Get the id and clone dat madafaka
*/
exports.CloneForm = function( req, res ){
	if (!req.user) { 
		res.redirect("/login");
	}
	Forms.findById(req.params.id,function( err, data ){
		if(err)
			res.send("false");
		else{
			var clone = new Forms({ 
				date 		: new Date(),
				builderCode : data.builderCode,
				html        : data.html,
				name        : data.name,
				users       : data.users 
			});
			clone.save(function(err){
				if(err)
					res.send("false");
				else
					res.send("true");
			});
		}
	})
}
/**
* @Receives the id
* @Posts the required html
*/
exports.GetFormHTML = function( req, res, next ){ 
	Forms.findById(req.body.id,function( err, data ){
		if(err)
			res.send("false");
		else{
			res.send(data.html).status(200); 
		}
	})
}
