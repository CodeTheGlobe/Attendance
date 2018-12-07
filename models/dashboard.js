var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Dashboard = new Schema({
    name:String,
    hours:String,
    date:String,
    month:String,
    minutes:String,
    hours1:String,
    minutes1:String
    
  }, {
      timestamps:true

});


//Shipment.plugin(passportLocalMongoose);
module.exports = mongoose.model('list', Dashboard);
