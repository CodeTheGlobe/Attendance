var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username:String,
    email:{
      type:String,
       required:true
    },
    password:{
      type:String,
      required:true
    },
    repassword:String,
    resetPasswordToken:{
        type:String,
        default:null
    },
    resetPasswordExpires:{
        type:String,
        default:null
    },
    
    admin: {
        type:Boolean,
        default:false
    }
  }, {
      timestamps:true

});

//User.methods.fullName = function() {
//  return (this.firstname + " " + this.lastname);
//}

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);
