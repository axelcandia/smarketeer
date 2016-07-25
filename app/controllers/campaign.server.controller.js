var Campaigns 	= require("../models/campaign.server.model.js"); 
var url  = require('url');


/**
* Renders the view to see all campaigns
*/
exports.RenderGetAll= function(req, res){
	if (!req.user) { 
		res.redirect("/login");
	}
	//GetAllCampaings for these user
	Campaigns.find({"users._id" : req.user.id},function(err,data){
		if(err)
			console.log(err);
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
		campaignId:"idcampaign",
		websiteUrl:"",
		campaign:"",
		source:"",
		medium:"",
		keywords:"",
		content:"",
		url:"",
		thirdtitle:"Crea tu campaña",
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
	Campaigns.findOne({"_id":req.params.id},function(err,data){
		if(err)
			res.redirect("/campaigns/seemore"); 
		console.log(data);
		res.render("campaigns/campaign-builder",{
			campaignId: data._id,
			websiteUrl: (data.websiteUrl) 	? data.websiteUrl 	: "",
			campaign  : (data.campaign) 	? data.campaign 	: "",
			source    : (data.source) 		? data.source 		: "",
			medium    : (data.medium) 		? data.medium 		: "",
			keywords  : (data.keywords) 	? data.keywords 	: "",
			content   : (data.content) 		? data.content 		: "",
			url       : (data.url) 			? data.url 			: "",
			thirdtitle: "Crea tu campaña"
		});

	});
	
}



/**
* Saves the data of the campaign
*/
exports.SaveCampaign = function(req, res){ 
	console.log(req.body);
	/*if(req.body){

		var data = url.parse(req.body.url,true);
		var costs=req.body.costs;

		if(req.body.id == "idcampaign")
		{
			SetNewCampaign( req.user, data,res,req.query.idSite,costs );
		}
		else
		{
			UpdateCampaign( res, data, req.body.id,costs );
		}  

	}	*/
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
/**
* Get the id and clone dat madafaka
*/
exports.CloneCampaign = function( req, res ){
	if (!req.user) { 
		res.redirect("/login");
	}
	Campaigns.findById(req.params.id,function( err, data ){
		if(err)
			res.send("false");
		else{
			var campaign = new Campaigns({
				websiteUrl : data.websiteUrl,
				campaign   : data.campaign+("(CLON)"),
				source     : data.source,
				medium     : data.medium,
				keywords   : data.keywords,
				content    : data.content,
				url        : data.url,
				users      : data.users,
				creado	   : new Date()
			});
			campaign.save(function(err){
				if(err)
					res.send("false");
				else
					res.send("true");
			});
		}
	})
}

function SetNewCampaign(user,data,res,idSite){
	var campaign = new Campaigns(data);
	campaign.save(function(err) {
      if (err) {
      	res.send("-1");
      }
      res.send(campaign._id); 
	});
}
/**
* Just an update
*/
function UpdateCampaign( res, data, id ){  
	var query = { "_id" : id };
	var update = data;

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
