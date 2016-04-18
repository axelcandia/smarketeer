// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var AccountInformationSchema = new mongoose.Schema({ 
   kind								         : String,
   username							         : String,
   totalResults					         : Number,
   startIndex						         : Number,
   itemsPerPage					         : Number,
   items 							         :[{  
         id 						         : String,
         kind						         : String,
         name                          : String,
         webProperties				      : [{  
               kind					      : String,
               id 					      : String,
               name 				         : String,
               internalWebPropertyId   : Number,
               level				         : String,
               websiteUrl			      : String,
               customDimIp             : String,
               profiles:[]
            }]
      }]
}); 

var AccountInformation = mongoose.model('AccountInformation', AccountInformationSchema); 

module.exports = AccountInformation;
