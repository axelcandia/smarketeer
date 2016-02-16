process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//Modules
var config 		= require('./config/config'),
    mongoose 	= require('./config/mongoose'),
    express 	= require('./config/express'),
    passport 	= require('./config/passport');
    path    	= require("path");

//Start directory
var    db = mongoose();
var   app = express();
    //passport = passport();

//Comentar esta linea antes de subir  
//app.use(app.static(path.join(__dirname, 'public')));    
//Send to the index
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render(path.join( __dirname+ "/index"));
});

/*
	Login and security
*/ 

app.get('/NewUser', function (req, res) { 
  res.render(path.join( __dirname+ "/app/views/security/NewUser"));
}); 



/*
	FUNNELS GETTERS
*/

app.get('/home/funnel/leads',function (req,res){
	res.render(path.join( __dirname + "/app/views/home/funnel/leads"));
});
app.get('/home/funnel/sales',function (req,res){
	res.render(path.join( __dirname + "/app/views/home/funnel/sales"));
});
app.get('/home/funnel/visitors',function (req,res){
	res.render(path.join( __dirname + "/app/views/home/funnel/visitors"));
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

app.get('/home/dashboard', function (req, res) {
  res.render(path.join( __dirname+ "/app/views/home/index"));
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

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

app.listen(config.port);
