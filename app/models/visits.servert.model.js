var mongoose = require("mongoose");

var VisitsSchema = new mongoose.schema({
	anonimousId		: String,
	totalVisits 	: Number,
	mail			:[],
	phone			:[],
	ip		 		: String, 
	visits 			: [
		campaign 	: String,
		source		: String,
		medium 		: String,
		content 	: String,
		referralurl : String
		ladingPage	: String
		sold 		: Boolean,
		amount 		: Number,
		status 		: String,
		hostname 	: String,
		geolocation : String,
		browser 	: String,
		platform 	: String,
		medium 		: String,
		term 		: String,
		form 		: String,
		name		: String,
		visits 		: Date,
		timeSpend 	: String,
		tPageViews 	: Number,
		pagesViewed :[]
	]
	lastDate		:Date,
	

});

var Visits = mongoose.model('Visits', VisitsSchema); 

module.exports = Visits;
