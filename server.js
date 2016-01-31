//Modules
var express = require("express");
var path    = require("path");

//Start directory
var app     = express();

//Send to the index
app.get("/",function(req,res){
	 res.sendFile(path.join( __dirname+ "/home.html"));
});
app.listen(3000);