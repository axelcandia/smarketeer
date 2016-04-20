var config			= require("../../config/config");

exports.getHome = function(req, res, next) {
	if (!req.user) { 
		console.log("I have to edit ths later");
	}
	else {
			res.render('home', {
				    items: "data.items"
				  });
		}
				
		};
 
//TODO si el length es mayor a uno en getGaViewProfile significa que uno tiene mas de 1 subvistas,
// despues tenemos que ver como se arregla este temea