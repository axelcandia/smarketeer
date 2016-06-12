var config			= require("../../config/config");
var Forms 			= require("../models/form.server.model");
var minify 			= require('html-minifier').minify;
var SolvedForms		= require("../models/solvedforms.server.model"); 
var Visitors		= require("../models/visitors.server.model");
//var mysql      		= require('mysql'); 
/**
* Requires a name to build the form properly
* status is eith:crear when you want to create a new form or cargar wheny ou want to load the data of a previously created one :D
*/
    /*var tunnel = require('tunnel-ssh').tunnel;
    //map port from remote 3306 to localhost 3306 
    var server = tunnel({host: '52.165.38.47', dstPort: 3306, username:"axel",password:"AlfredHitchcock12"}, function (error, result) {
        //you can start using your resources here. (mongodb, mysql, ....) 
        console.log('connected');

    });*/

exports.RenderFormBuilder= function(req, res, next){
	if (!req.user) { 
		res.redirect("/login");
	} /*
	var connection = mysql.createConnection({
	    host: '127.0.0.1', // Important to connect to localhost after connecting via ssh in screen
	    user: 'bitnami',
	    password: '3963974397',
	    database: 'bitnami_piwik',
	    port: 3000
	});
        connection.connect(function(err) {
			  if (err) {
			    console.error('error connecting: ' + err.stack);
			    return;
			  }
			  connection.query( 'SELECT *  FROM  piwik_log_visit WHERE idvisit=1;', function(err, rows, fields) {
				  if (err) throw err;

				  console.log('The solution is: ', rows[0].idvisitor);
				  var id=Buffer.from(rows[0].idvisitor); 
				  const StringDecoder = require('string_decoder').StringDecoder;
				  const decoder = new StringDecoder('utf8');
				  console.log('The solution is: ', decoder.write(id)); 
				 });

    	});

		/*connection.connect(function(err) {
	  if (err) {
	    console.error('error connecting: ' + err.stack);
	    return;
	  }
	 
	  console.log('connected as id ' + connection.threadId);
	});*/  
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
		res.render("home/forms/viewforms",{
			forms:data
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
	//var obj= JSON.parse([req.body]);   
	if( Object.keys(req.body).length >2 ){ 
		var  solved = SolvedForms({
			date: new Date(),
			fields  : req.body
		});
		//Se guarda el campo
		solved.save();
		//Se ve en que estado esta nuestro pibe
		//Si recibimos email, nombre o apellido añadir con el status a identificado
		if( req.body.Apellido || req.body.Nombre || req.body.email )
		{

		}
	}
	//Si es mayor a 2 hagamos el guardado, si no, do not even bother
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
* Receives data of whatever and returns the properid
*/
exports.GetVisitorId = function( req, res, next){
	if(!req.body)
		return res.send("-1");
	var options = { upsert: true, new: true, setDefaultsOnInsert: true }; 
	var query = { CookieId :req.body.id};
	var update;
	console.log("ESTE ES EL di" +req.body.id)
	if(req.body.email){
		update = { 
	    	"email"			: req.body.email
	    };
	}
	else{
		update = { 
	    	$addToSet: { cookies			: {CookieId:req.body.id}}
	    }; 
	} 

	Visitors.findOneAndUpdate( query, update, options, function(error, result) {
		if(error){
			console.log(error);
			res.send(req.body.id);
		}
		else{ 
			console.log(result._id);
			res.send( result._id ).status(200);
		}
	}); 

	

}
