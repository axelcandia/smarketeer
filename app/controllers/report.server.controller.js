var config		     = require("../../config/config");


exports.RenderReport=function(req,res,next){
	res.render("home/reporting",{
		idSite:req.query.idSite
	});
} 