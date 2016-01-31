/*
/
/Modules
var express = require("express");
var path    = require("path");

//Start directory
var app     = express();
app.use(express.static(path.join(__dirname, 'public')));
//Send to the index


app.get("/",function(req,res){
	
	 res.sendFile(path.join( __dirname+ "/index.html"));
});
app.listen(3000);
*/
var http = require('http')
var port = process.env.PORT || 1337;
http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(port);