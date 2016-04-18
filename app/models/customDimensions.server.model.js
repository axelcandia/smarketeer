// load the things we need
var mongoose     = require('mongoose');

// define the schema for our user model
var CustomDimensionSchema = new mongoose.Schema({ 
   user  :  String,
   pages : [{
   	  _id: String,
      dimesionId: String
   }]
}); 

var CustomDimension = mongoose.model('CustomDimension', CustomDimensionSchema); 

module.exports = CustomDimension;
