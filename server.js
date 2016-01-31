//Modules
var express = require("express");
var path    = require("path");

//Start directory
var app     = express();
app.use(express.static(path.join(__dirname, 'public')));
//Send to the index


app.get("/",function(req,res){
	
	 res.sendFile(path.join( __dirname+ "/main.html"));
});
app.listen(3000);