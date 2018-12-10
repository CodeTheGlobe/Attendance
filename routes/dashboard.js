var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Login = require('../models/Login');
var Verify = require('./verify');




var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')


.get(function(req,res,next) {
//    console.log(req.query);
    var date = req.query.date;
    var month = req.query.month;
    console.log(date);
    console.log(month);

//    var d = new Date();
//    var myDate = d.getDate();
//    var myMonth = d.getMonth() + 1;

     Login.find({date:date, month:month}, function(err,dish){
         if(err) throw err;
         res.json(dish);
//         console.log(dish);

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

dishRouter.route('/month')
.get(function(req,res,next) {
//    console.log(req.query);
    var date = req.query.date;
    var month = req.query.month;
    console.log(date);
    console.log(month);

//    var d = new Date();
//    var myDate = d.getDate();
//    var myMonth = d.getMonth() + 1;

     Login.find({month:month}, function(err,dish){
         if(err) throw err;
         res.json(dish);
//         console.log(dish);

     });


})

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
