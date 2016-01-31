
//Modules
var express = require("express");
var path    = require("path");
var port 	= process.env.PORT || 1337;
//Start directory
var app     = express(); 


/*app.get("/",function(req,res){
	
	 
});
app.listen(port);
*/
app.get('/', function (req, res) {
  res.sendFile(path.join( __dirname+ "/index.html"));
});

app.listen(port, function () {
  console.log('Example app listening on port!'+port);
});