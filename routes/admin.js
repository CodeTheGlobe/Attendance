var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin');
});


module.exports = router;
