var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Login = require('../models/Login');
var Verify = require('./verify');




var loginRouter = express.Router();
loginRouter.use(bodyParser.json());

loginRouter.route('/')



.get(function(req,res,next) {
    var d = new Date();
    var myDate = d.getDate();
    var myMonth = d.getMonth() + 1;

     Login.find({date: myDate, month: myMonth}, function(err,log){
         if(err) throw err;
         res.json(log);

     });


})



.post(function(req,res,next) {
    Login.create(req.body, function(err,log) {
        if(err) return next(err);
        res.json(log);
    });


})

.delete(Verify.verifyOrdinaryUser,function(req,res,next) {
    Login.remove({}, function(err, resp){
        if(err) return next(err);
        res.json(resp);
    });
});

loginRouter.route('/:logId')
//
//.get(function(req,res,next){
//    Login.findById(req.params.logId, function(err, log) {
//        if(err) return next(err);
//        res.json(log);
//    });
//})
//
.put(function(req,res,next) {
    Login.findByIdAndUpdate(req.params.logId, {
        $set:{'minutes1':req.body.minutes1,'hours1':req.body.hours1}
    }, {
        new:true
    },function (err,log) {
        if(err) throw err;

        res.json(log);
    })
});

//.delete(function(req,res,next) {
//    Login.findByIdAndRemove(req.params.logId, function(err, resp){
//        if(err) throw err;
//        res.json(resp);
//    });
//});
//
//
//


module.exports = loginRouter;
