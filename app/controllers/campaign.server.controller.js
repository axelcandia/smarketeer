var Campaigns 	 	= require("../models/campaign.server.model.js"); 
var url 		 	= require('url'); 
var xlstojson 		= require("xls-to-json-lc");
var xlsxtojson 		= require("xlsx-to-json-lc");
var fs 				= require('fs');
var async           = require("async");

/**
* Renders the view to see all campaigns
*/
exports.RenderGetAll= function(req, res){
	if (!req.user) { 
		res.redirect("/login");
	}

	//act_204106777?fields=campaigns{insights{date_start,date_stop,spend,place_page_name,campaign_name}}
	//GetAllCampaings for these user
	Campaigns.find({"idSite" : req.query.idSite},function(err,data){
		if(err)
			console.log(err);
		console.log(JSON.data);
		res.render("campaigns/viewcampaigns",{
			campaigns:data,
			idSite: req.query.idSite
		});
	})
	//
}
/**
* Renders the view to the campaign builder
*/
exports.RenderGetNew= function(req, res){
	if (!req.user) { 
		res.redirect("/login");
	}
	res.render( "campaigns/campaign-builder",{
		total:"",
		content:"",
		medium:"",
		source:"",
		term:"",
		campaign:"",
		url:"", 
		campaignId:"idcampaign",  
		idSite:req.query.idSite, 
		empty    :"",
		to:"",
		from:"",
		idSite:req.query.idSite 
	});
}
/**
* Renders the view to See more data of a specific campaign
*/
exports.RenderSeeMore = function(req, res){
	if (!req.user) { 
		res.redirect("/login");
	}
	console.log(req.body);
	Campaigns.findById(req.params.id,function(err,data){
		if(err)
			res.redirect("/campaigns/seemore");  
		//make from
		var from = data.from||new Date();
		from 	 = from.toISOString();
		from 	 = from.substr(from,from.indexOf("T")).split("-");
		from	 = from[2]+"/"+from[1]+"/"+from[0]
		//make to
		var to = data.to||new Date();
		to 	 = to.toISOString();
		to 	 = to.substr(to,to.indexOf("T")).split("-");
		to = to[2]  +"/"+to[1]  +"/"+to[0];

		res.render("campaigns/campaign-builder",{
			total 	:(data.total)? data.total 		: "",
			to 		:to,
			from	:from,
			content	:(data.content)?data.content 	: "",
			medium	:(data.medium)?data.medium 		: "",
			source	:(data.source)?data.source 		: "",
			term 	:(data.term)?data.term 			: "",
			campaign:(data.campaign)?data.campaign 	: "",
			url 	:(data.url)?data.url 			: "",
			campaignId:data._id,
			empty    :"",
			idSite: req.query.idSite 
		});

	});
	
}



/**
* Saves the data of the campaign
*/
exports.SaveCampaign = function(req, res){ 
	console.log(req.body); 
		if(req.body._id == "idcampaign")
		{

			SetNewCampaign( req,res);
		}
		else
		{
			UpdateCampaign(req,res);
		}   
} 
/**
* Delete the campaign from our DB
*/
exports.DeleteCampaign = function(req,res){
	if (!req.user) { 
		res.redirect("/login");
	}
	Campaigns.findByIdAndRemove(req.params.id,function(err){
		if(err)
			res.send("false");
		else
			res.send("true");

	})
}
exports.importCampaign = function(req,res){ 
	
	async.series({
      json: function(callback){
      	ImportXML2Json(req,res,callback)
      }
  },function(err, results) {
  	if(err){
  		res.send('{"err":"200"}').status(200);
  		return;
  	}  
	  	Campaigns.create(results.json, function (err, data) {
		  if (err) {
		  	console.log(err);
		  	return 0;
		  };
		  console.log(data);
		  res.send({});
		}); 
  });

}
//Requires a xls tranfsorm it to json and save
function ImportXML2Json(req,res,callback){  
		var path=req.file.path; 
		var exceltojson=""; 
		var json;
		//recognize if it xls or xlsx
		if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
            try {
                exceltojson({
                    input: path,
                    output: null, //since we don't need output.json
                    lowerCaseHeaders:true //since we don't need output.json 
                }, function(err,result){
                	//Delete the file we dont need i
                	fs.unlink(path, (err) => {
					  if (err) callback(res.json({error_code:1,err_desc:err, data: null}),null);
					  console.log('successfully deleted');
					});
					//Now we continue
                    if(err) {
                    	console.log(err);
                        callback({error_code:1,err_desc:err, data: null},null);
                    } 
                    //now saave the data
                  	var json = SetCampaignJSON(result,req.query.idSite);  
                  	callback(null,json);
                   
                });
            } catch (e){
            	callback({error_code:1,err_desc:"Corupted excel file"},null); 
            }

} 
/**
*Adds idSite to every campaign
*/
function SetCampaignJSON(array,idSite){
	for(var i=0; i<array.length;i++){
		array[i].idSite=idSite;
	}
	return array;

}
function SetNewCampaign(req,res){ 
	var campaign = new Campaigns(req.body.Data);
	campaign.save(function(err) {
      if (err) {
      	console.log(err);
      	res.send("-1");
      } 
      else res.send(campaign._id).status(200); 
	});
}
/**
* Just an update
*/
function UpdateCampaign( req,res ){  
	var query = { "_id" : req.body._id };
	var update = req.body.Data;

	var options = { upsert: true, new: true, setDefaultsOnInsert: true };

	Campaigns.findOneAndUpdate( query, update, options, function(error, result) {
		if(error){
			console.log(error);
		}
		else{
			res.send( result._id );
		}
	}); 
}

//exports
exports.ImportXML2Json=ImportXML2Json;