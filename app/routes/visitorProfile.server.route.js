var visitorProfileController = require("../controllers/visitorProfile.server.controller"); 
var VerifyUser		 = require('../controllers/user').VerifyUser;
module.exports = function(app) { 
app.get("/visitors/seemore/:id/",VerifyUser, visitorProfileController.GetVisitData);
app.post("/VisitorProfile/visitors/seemore/AddComment*",visitorProfileController.AddComment);
app.post("/visitors/seemore/GetVisitorAbout*",visitorProfileController.GetVisitorAbout);

}