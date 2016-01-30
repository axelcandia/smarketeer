//Modules
var express = require("express");

//Start directory
var app     = express();

//Send to the index
app.get("/",function(req,res){
	res.sendFile("main.html");
});