
//Modules
var express 	= require("express");
var path    	= require("path");
//var mongoose	= require("mongoose");

var port 	= process.env.PORT || 1337;
//Start directory
var app     = express();

//Comentar esta linea antes de subir
//app.use(express.static(path.join(__dirname, 'public')));

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
app.get('/Proto', function (req, res) {
  res.sendFile(path.join( __dirname+ "/Layout/Dashboard/index.html"));
});

/*
	FUNNELS GETTERS
*/
app.get('/funnel-leads',function(req,res){
	res.sendFile(path.join( __dirname + "/Layout/Dashboard/funnel/funnel-leads.html"));
});
app.get('/funnel-sales',function(req,res){
	res.sendFile(path.join( __dirname + "/Layout/Dashboard/funnel/funnel-sales.html"));
});
app.get('/funnel-visitors',function(req,res){
	res.sendFile(path.join( __dirname + "/Layout/Dashboard/funnel/funnel-visitors.html"));
});
app.get('/funnel-visitors',function(req,res){
	res.sendFile(path.join( __dirname + "/Layout/Dashboard/funnel/funnel-visitors.html"));
});


app.listen(port);
