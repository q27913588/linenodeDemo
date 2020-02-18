var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser = require('body-parser');
var linebot = require('linebot');
var admin = require("firebase-admin");
var app = express();
var serviceAccount = require("./nodejs-71818-firebase-adminsdk-jcuan-238e882397.json");

//設定Bot
var bot = linebot({
  channelId: 'U6d2d69b4db57fa8c4b479094c2606d30',
  channelSecret: 'eab6b641db7711334859165ebd18f6ea',
  channelAccessToken: 'jH5fMrxsL66jFp8p8GHc3gDtULsKW1dQrMSLlcfgfXlVoSpsC526dsQHrPDLx9S0J6BB7WealVY+SNnsOcKY/1Af8NY6N9skJ53HDT+rMB4IvmvFjyqowOC6EApdNXlFxNUPfoiuYkndJ75f9ueWnAdB04t89/1O/w1cDnyilFU='
});

const linebotParser = bot.parser();
app.post('/linewebhook', linebotParser);
bot.on('message', function (event) {
  event.reply(event.message.text).then(function (data) {
    // success
    console.log(event.message.text);
  }).catch(function (error) {
    // error
  });
});
//
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nodejs-71818.firebaseio.com"
});


// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
 