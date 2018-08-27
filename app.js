var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var config = require('./config');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
const flash = require('express-flash-notification');
var session = require('express-session');
//var flash = require('express-flash');

//require cors
var cors = require('cors');
var config = JSON.parse(process.env.APP_CONFIG);
//var url = 'mongodb://127.0.0.1:27017/conFusion';
var url = "mongodb://" + config.mongo.user + ":" + "wannekaDB17"+ "@" +config.mongo.hostString;
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open',function() {
    //we're connected
    console.log('connected to the database server')
});

var index = require('./routes/index');
var login = require('./routes/login');
var admin = require('./routes/admin');
//var users = require('./routes/users');
//var messages = require('./routes/message');
//var sendMessages = require('./routes/sendMessage');
//var login = require('./routes/page-login');
//var tables = require('./routes/tables');
//var forget = require('./routes/forget');
//var register = require('./routes/register');
//var forgot = require('./routes/forgot');
//var reset = require('./routes/reset');
//var shipment = require('./routes/shipment');
//var createShipment = require('./routes/createShipment');
//var updateShipment = require('./routes/updateShipment');


var app = express();
//var ipName = require('dns').lookup(require('os').hostname(), function (err, add, fam) {
////  console.log('addr: '+add);
//    return;
//})
//console.log(ipName.hostname);

//socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function(req,res,next) {
    res.io = io;
    next();
})

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
//for sending success messages
app.use(flash(app));

//passport config
var User = require('./models/user');
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/login', login);
app.use('/admin', admin);
//app.use('/users', users);
//app.use('/message',messages);
//app.use('/send',sendMessages);
//app.use('/login',login);
//app.use('/forget',forget);
//app.use('/register',register);
//app.use('/table',tables);
//app.use('/forgot',forgot);
//app.use('/reset',reset);
//app.use('/shipment',shipment);
//app.use('/ship',createShipment);
//app.use('/update',updateShipment);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
    //render the error to you client application
    //res.render('error-404');
    //or
    res.json({
        message:err.message,
        error:err
    });

});

module.exports = {app:app, server:server};
