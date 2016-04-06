var analytics 		= require('googleapis').analytics;
/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
   analytics.management.accounts.list(function(res){
   	console.log("HOLA"+res);
   })
  res.render('home', {
    title: 'Home'
  });
};