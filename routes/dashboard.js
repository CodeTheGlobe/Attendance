var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Login = require('../models/Login');
var Verify = require('./verify');




var dashRouter = express.Router();
dashRouter.use(bodyParser.json());

dashRouter.route('/')


.get(function(req,res,next) {
    var date = req.query.date;
    var month = req.query.month;
    console.log(date);
    console.log(month);


     Login.find({date:date, month:month}, function(err,obj){
         if(err) throw err;
         res.json(obj);

     });


})



.post(function(req,res,next) {
    Login.create(req.body, function(err,obj) {
        if(err) return next(err);
        res.json(obj);
    });


})

.delete(Verify.verifyOrdinaryUser,function(req,res,next) {
    Login.remove({}, function(err, resp){
        if(err) return next(err);
        res.json(resp);
    });
});

dashRouter.route('/month')
.get(function(req,res,next) {
    var date = req.query.date;
    var month = req.query.month;
    console.log(date);
    console.log(month);

     Login.find({month:month}, function(err,obj){
         if(err) throw err;
         res.json(obj);

     });


})




module.exports = dashRouter;
