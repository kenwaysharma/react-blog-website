var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require("cors")
var postRouter = require('./routes/postController');
var commentRouter = require('./routes/commentController')
var authRouter = require('./routes/authRouter')
var {checkUser}=require('./middleware/authMiddleWare')
var app = express();

const corsConfig = {
    origin: true,
    credentials: true,
  };
  
  app.use(cors(corsConfig));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
          
          



app.use('*', checkUser)
app.use('/apiEndpoint', postRouter);
app.use('/apiEndpoint/CREATE/comment', commentRouter);
app.use('/apiEndpoint/CREATE/user', authRouter);



module.exports = app;
