var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dashboard = require('../models/dashboard');
var Verify = require('./verify');




var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')


.get(function(req,res,next) {
    console.log(req.params);

//    var d = new Date();
//    var myDate = d.getDate();
//    var myMonth = d.getMonth() + 1;

     Dashboard.find({}, function(err,dish){
         if(err) throw err;
         res.json(dish);

     });


})



.post(function(req,res,next) {
    Dashboard.create(req.body, function(err,dish) {
        if(err) return next(err);
        res.json(dish);
    });


})

.delete(Verify.verifyOrdinaryUser,function(req,res,next) {
    Dashboard.remove({}, function(err, resp){
        if(err) return next(err);
        res.json(resp);
    });
});

dishRouter.route('/:dishId')
//
//.get(function(req,res,next){
//    Dashboard.findById(req.params.dishId, function(err, dish) {
//        if(err) return next(err);
//        res.json(dish);
//    });
//})
//
.put(function(req,res,next) {
    Dashboard.findByIdAndUpdate(req.params.dishId, {
        $set:{'minutes1':req.body.minutes1,'hours1':req.body.hours1}
    }, {
        new:true
    },function (err,dish) {
        if(err) throw err;

        res.json(dish);
    })
});

//.delete(function(req,res,next) {
//    Dashboard.findByIdAndRemove(req.params.dishId, function(err, resp){
//        if(err) throw err;
//        res.json(resp);
//    });
//});
//
//
//


module.exports = dishRouter;
