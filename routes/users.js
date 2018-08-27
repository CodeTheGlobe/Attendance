var express = require('express');
var router = express.Router();

var passport = require('passport');
var User = require('../models/user');

var Verify = require('./verify');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  User.find({},function(err,users) {
    if(err) return next(err);
    res.json(users);
  })
});

router.post('/register',function(req,res) {
    var userData = {
        username:req.body.username,
        email:req.body.email,
        phone:req.body.phone,
        country:req.body.country,
        city:req.body.city,
        address:req.body.address,
        password:req.body.password,
        repassword:req.body.repassword,
//        admin:req.body.admin
    }
    console.log(req.body);
    User.register(new User(userData),req.body.password, function(err,user) {
        if(err) {
            console.log(err)
            return res.status(500).json({err:err});
        }

        passport.authenticate('local')(req,res, function(){
        return res.status(200).json({status:'Registration Succesful!'});
        });
    });
});

//router.put('/:userId', function (req, res, next) {
//    User.findById(req.params.userId, function (err, user) {
//        user.active = false;
//        user.save(function (err, data) {
//            res.json(data);
//        })
//    })
//})

router.post('/login',function(req,res,next) {
     passport.authenticate('local',function(err,user,info) {
         if(err) {
             return next(err);
         }
         if(!user) {
             return res.status(401).json({
                 err:info
             });
         }
         req.logIn(user, function(err) {
             if(err) {
                 return res.status(500).json({
                     err:'Could not log in the user: '+err
                 });
             }
             //console.log('User in users: ', user);
             var theUser = {"username":user.username, "_id":user._id, "admin":user.admin};
             var token = Verify.getToken(theUser);

             res.status(200).json({
                 status:'Login Succesful',
                 success:true,
                 token:token,
                 user:user
             });
         });
     })(req,res,next);
});

router.get('/logout',function(req,res) {
    
    req.logout();
    res.status(200).json({
        status:'logged out'
    });

    //you should also expire the token
});

module.exports = router;
