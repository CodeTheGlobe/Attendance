var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Login = require('../models/login');
var Verify = require('./verify');


var ipName = require('dns').lookup(require('os').hostname(), function (err, add, fam) {
//  console.log('addr: '+add);
    return;
})

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
    if(ipName.hostname == 'JOSEPH'||ipName.hostname == 'DESKTOP-Q808O43'||ipName.hostname == 'DESKTOP-SB076C5'||ipName.hostname == 'DESKTOP-1QIMCS3'||ipName.hostname == 'DESKTOP-7VB6V3N'||ipName.hostname == 'DESKTOP-25PQQM3') {
            Login.create(req.body, function(err,dish) {
        if(err) return next(err);

        console.log('Post Created!');
//        var id = dish._id;

        res.json(dish);
    });
    }

else {
    console.log('failed');
}


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
