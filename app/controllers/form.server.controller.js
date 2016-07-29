var config			= require("../../config/config");
var Forms 			= require("../models/form.server.model");
var minify 			= require('html-minifier').minify;
var SolvedForms		= require("../models/solvedforms.server.model"); 
var Visitors		= require("../models/visitors.server.model");
var Website 		= require('../models/websites.server.model');
var config			  = require("../../config/config");
var PiwikClient   = require('piwik-client');
var piwik         = new PiwikClient(config.piwik.url, config.piwik.token )
var async           = require("async");

exports.RenderFormBuilder= function(req, res, next){
	if (!req.user) { 
		res.redirect("/login");
	}
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
			"idSite":req.query.idSite,
			"builderCode":'[{"title":"Form Name","fields":{"name":{"label":"Nombre","type":"input","value":"REEMPLAZAR"}},"fresh":true}]'.replace(/REEMPLAZAR/g, name)
		});

		NewForm.save(function(err) {
	      if (err) {
	      	res.send("-1");
	      }
	      else{
	      	var url="/home/forms/formbuilder/"+req.params.name+"/"+NewForm.id+"/?idSite="+req.query.idSite;
	      	return res.redirect(url);
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
				var script 	= "<script id='"+found.id+"'>"+
				                    "(createform(document.currentScript.id,'"+req.query.idSite+"'));"+
				               "</script>"; 
				res.render("home/forms/formbuilder/index",{ 
		      		Name       : found.name,
		      		formId     : found.id,
		      		script 	   : script,
		      		redirectTo : found.finalAction.redirectTo,
		      		message    : found.finalAction.message,
		      		redirect   : found.finalAction.redirect || false,
		      		url: 		"",
		      		builderCode: found.builderCode,
		      		idSite: req.query.idSite
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
		res.render("home/forms/viewforms",{
			forms:data,
			idSite:req.query.idSite
		});
	});
	//
}

//DELETE receiver or modify it in the next version :DDD
exports.UpdateForm = function(req,res,next){ 
	var send='"Send(\''+req.body.id+'\')"';
	//Form it, minify it, sell it
	var html= "<form class='form-horizontal smkt_form' id='form."+req.body.id+"'>" +
				req.body.html+
				//"<button id='smkt_button' onclick="+send+">Enviar</button>"+
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
		var  solved = SolvedForms({
			date: new Date(),
			fields: req.body,
			userId: req.body.userId,
			idSite:req.body.idSite,
			secondId:req.body.secondId
		});
		//Se guarda el campo
		solved.save(function (err) {
		  if (err){

		  	res.send("Error intente devuelta");
		  }
		  else{
		  		GetFinalAction(res, req.body.form_id );
		  }
		}); 
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
			if(data) 
				res.send(data.html).status(200); 
		}
	})
}
/**
*Sets the final action AS
*/
exports.SetFinalAction=function( req,res,next){ 
	console.log(req.body.id);
	Forms.findByIdAndUpdate(req.body.id,{finalAction:req.body.finalAction},function(err,results){
		if(err)
			return 0;
		else 
		res.send("ok").status(200);
	});

}
//Gets the final action and sends what we have to do next
function GetFinalAction(res,formId){
	console.log(formId);
	Forms.findById(formId,function(err,forms){ 
		res.send(forms.finalAction).status(200);
	});

}
/**
* Update the ID to thhe email addres
*/
exports.UpdateID = function(req,res,next){ 
	if(!req.body.email){
		res.send("0").status("200");
		return;
	}  

	async.series({
      visitas: function(callback){ 
            piwik.api({
                method:   'Smarketeer.updateId',
                userId:    req.body.userId,
                email: 	   req.body.email, 
                idSite:    req.body.idSite
              },callback);  
          }, 
         visita2s: function(callback){ 
            piwik.api({
                method:   'Smarketeer.updateId',
                userId:    req.body.userId,
                email: 	   req.body.email, 
                idSite:    req.body.idSite
              },callback);  
          },
      UpdateForms:function(callback){
	      	var conditions = { userId : req.body.userId }
			  , update = { userId: req.body.email}
			  , options = { multi: true };

			SolvedForms.update(conditions, update, options, function(err,data){
				if(err)
					callback(err,null);
				else
					callback(null,err);
			});  
	 	},
	 UpdateVisitors:function(callback){
	 	var conditions = { userId : req.body.userId, idSite:req.body.idSite }
			  , update = { userId: req.body.email}
			  , options = { multi: false };

			Visitors.update(conditions, update, options, function(err,data){
				if(err)
					callback(err,null);
				else
					callback(null,err);
			});

	 	}
	 },function(err, results) {
        if(err) console.log(err); 
        console.log("LEST UPDATE:"+JSON.stringify(results));
       }); 
	}