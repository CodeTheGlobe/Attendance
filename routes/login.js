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
    var d = new Date();
    var myDate = d.getDate();
    var myMonth = d.getMonth();
//    console.log(req.query.username);
     Login.find({date: myDate, month: myMonth}, function(err,dish){
         if(err) throw err;
         res.json(dish);

     });


})



.post(function(req,res,next) {    
    Login.create(req.body, function(err,dish) {
        if(err) return next(err);
        res.json(dish);
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
    Login.findByIdAndUpdate(req.params.dishId, {
        $set:{'minutes1':req.body.minutes1,'hours1':req.body.hours1}
    }, {
        new:true
    },function (err,dish) {
        if(err) throw err;

        res.json(dish);
    })
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
