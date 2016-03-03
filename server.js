process.env.NODE_ENV =/* process.env.NODE_ENV || */'development';

var config = require('./config/config'),
	mongoose = require('./config/mongoose'),
	express = require('./config/express'),
	path    	= require("path"),
	passport = require('./config/passport');

var db = mongoose(),
	app = express(),
	passport = passport();


//IMPORTANT THE SECTION BELOW HAS TO BE DELETED ASAP AND IMPORTED TO module.exports = app; 
	/*
		FUNNELS GETTERS
	*/
	app.get('/home/funnel/leads',function (req,res){
			res.render("home/funnel/leads");
		});
		app.get('/home/funnel/sales',function (req,res){
			res.render(path.join( __dirname + "/app/views/home/funnel/sales"));
		});
		app.get('/home/funnel/visitors',function (req,res){
			res.render(path.join( __dirname + "/app/views/home/funnel/visitors"));
		}); 


		
	app.get('/',function (req,res){
		res.render(path.join( __dirname + "/app/views/intro"));
	}); 
	app.get('/home/campaign-builder',function (req,res){ 
		res.render(path.join( __dirname + "/app/views/home/campaign-builder"));
	}); 
	/*
		FORMS
	*/
	app.get('/home/allforms',function (req,res){
		res.render(path.join( __dirname + "/app/views/home/allforms"));
	}); 
	app.get('/home/forms/formbuilder',function (req,res){
		res.render(path.join( __dirname + "/app/views/home/forms/formbuilder"));
	});  

	/*
		Dashboards and other in home
	*/
	app.get('/home/costs',function (req,res){
		res.render(path.join( __dirname + "/app/views/home/costs"));
	}); 
	app.get('/home/MyPlan',function (req,res){
		res.render(path.join( __dirname + "/app/views/home/MyPlan"));
	});

	app.get('/home/reporting',function (req,res){
		res.render(path.join( __dirname + "/app/views/home/reporting"));
	});
	 
	/*
		User
	*/
	app.get('/user/costs', function (req, res) {
	  res.render(path.join( __dirname+ "/app/views/user/costs"));
	});
	app.get('/user/MyPlan', function (req, res) {
	  res.render(path.join( __dirname+ "/app/views/user/MyPlan"));
	});
	app.get('/user/MyProfile', function (req, res) {
	  res.render(path.join( __dirname+ "/app/views/user/MyProfile"));
	});


 module.exports = app;

app.listen(config.port);//;