
//Modules
var express 	= require("express");
var path    	= require("path");
//var mongoose	= require("mongoose");

var port 	= process.env.PORT || 1337;
//Start directory
var app     = express();

//Comentar esta linea antes de subir
 app.use(express.static(path.join(__dirname, 'public'))); 
 app.use(express.static(path.join(__dirname, 'public/global'))); 
//Send to the index

app.get('/', function (req, res) {
  res.sendFile(path.join( __dirname+ "/index.html"));
});


app.get('/login', function (req, res) {
  res.sendFile(path.join( __dirname+ "/Layout/Security/login.html"));
});

app.get('/Dashboard', function (req, res) {
  res.sendFile(path.join( __dirname+ "/Layout/Dashboard/index.html"));
});
app.get('/NewUser', function (req, res) {
  res.sendFile(path.join( __dirname+ "/Layout/Security/NewUser.html"));  
});
app.get('/home/funnel/leads',function (req,res){
	res.sendFile(path.join( __dirname + "/Layout/Dashboard/funnel/funnel-leads.html"));
});
app.get('/home/funnel/sales',function (req,res){
	res.sendFile(path.join( __dirname + "/Layout/Dashboard/funnel/funnel-sales.html"));
});
app.get('/home/funnel/visitors',function (req,res){
	res.sendFile(path.join( __dirname + "/Layout/Dashboard/funnel/funnel-visitors.html"));
});
app.get('/home/funnel/visitors',function (req,res){
	res.sendFile(path.join( __dirname + "/Layout/Dashboard/funnel/funnel-visitors.html"));
});
app.get('home/costs',function (req,res){
	res.sendFile(path.join( __dirname + "/Layout/Dashboard/costs.html"));
}); 
app.get('/home/MyPlan',function (req,res){
	res.sendFile(path.join( __dirname + "/Layout/Dashboard/user/MyPlan.html"));
});
app.get('/home/campaign-builder',function (req,res){
	res.sendFile(path.join( __dirname + "/Layout/Dashboard/campaign-builder.html"));
}); 
 
app.listen(port);
