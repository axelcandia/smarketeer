
//Modules
var express 	= require("express");
var path    	= require("path");
//var mongoose	= require("mongoose");

var port 	= process.env.PORT || 1337;
//Start directory
var app     = express();

//Comentar esta linea antes de subir
app.use(express.static(path.join(__dirname, 'public'))); 
//Send to the index
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render(path.join( __dirname+ "/index"));
});


app.get('/login', function (req, res) {
  res.render(path.join( __dirname+ "/Layout/Security/login"));
});

app.get('/home/dashboard', function (req, res) {
  res.render(path.join( __dirname+ "/Layout/home/index"));
});
app.get('/NewUser', function (req, res) {
  res.render(path.join( __dirname+ "/Layout/Security/NewUser"));
}); 
/*
	FUNNELS GETTERS
*/

app.get('/home/funnel-leads',function (req,res){
	res.render(path.join( __dirname + "/Layout/home/funnel-leads"));
});
app.get('/home/funnel-sales',function (req,res){
	res.render(path.join( __dirname + "/Layout/home/funnel-sales"));
});
app.get('/home/funnel-visitors',function (req,res){
	res.render(path.join( __dirname + "/Layout/home/funnel-visitors"));
}); 
app.get('/home/campaign-builder',function (req,res){
	res.render(path.join( __dirname + "/Layout/home/campaign-builder"));
}); 
/*
	FORMS
*/
app.get('/home/forms',function (req,res){
	res.render(path.join( __dirname + "/Layout/home/forms"));
}); 
app.get('/home/formbuilder',function (req,res){
	res.render(path.join( __dirname + "/Layout/home/formbuilder/index"));
}); 



app.get('/user/costs',function (req,res){
	res.render(path.join( __dirname + "/Layout/home/costs"));
}); 
app.get('/user/MyPlan',function (req,res){
	res.render(path.join( __dirname + "/Layout/user/MyPlan"));
});

 
app.listen(port);
