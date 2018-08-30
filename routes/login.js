var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Login = require('../models/Login');
var Verify = require('./verify');




//var sys = require('util');
//var stdout;
//var exec = require('child_process').exec;
//function puts(error, stdout, stderr) {
//    console.log(stdout)
//}
//
//exec("wmic CPU get ProcessorId", puts);
//exec("wmic DISKDRIVE get SerialNumber", puts);




var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')



.get(function(req,res,next) {
//    console.log(req.query.username);
     Login.find({}, function(err,dish){
         if(err) throw err;
         res.json(dish);

     });


})



.post(function(req,res,next) {
    
var ipName = require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log(add);
//    return;

    
    if(add == '172.17.0.29') {
            Login.create(req.body, function(err,dish) {
        if(err) return next(err);

//        console.log(code);
//        var id = dish._id;

        res.json(dish);
    });
    }
//
//else {
//    console.log(stdout);
//}

});
})

.delete(Verify.verifyOrdinaryUser,function(req,res,next) {
    Login.remove({}, function(err, resp){
        if(err) return next(err);
        res.json(resp);
    });
});

dishRouter.route('/:dishId')
//
//.get(function(req,res,next){
//    Login.findById(req.params.dishId, function(err, dish) {
//        if(err) return next(err);
//        res.json(dish);
//    });
//})
//
.put(function(req,res,next) {
     if(ipName.hostname == 'JOSEPH') {
    Login.findByIdAndUpdate(req.params.dishId, {
        $set:{'minutes1':req.body.minutes1,'hours1':req.body.hours1}
    }, {
        new:true
    },function (err,dish) {
        if(err) throw err;

        res.json(dish);
    })
    }
    else{
        consle.log("failed to update");
    }
});

//.delete(function(req,res,next) {
//    Login.findByIdAndRemove(req.params.dishId, function(err, resp){
//        if(err) throw err;
//        res.json(resp);
//    });
//});
//
//
//


module.exports = dishRouter;
