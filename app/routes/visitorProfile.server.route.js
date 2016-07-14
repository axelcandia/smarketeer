var visitsController = require("../controllers/visitorProfile.server.controller"); 
var VerifyUser		 = require('../controllers/user').VerifyUser;
module.exports = function(app) { 
app.get("/visitors/seemore/:id/",VerifyUser, visitsController.GetVisitData);
}