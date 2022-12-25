const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//method-override
const methodOverride = require('method-override');
//session
const session = require('express-session');
const passport = require('passport');
//favicon

//dotenv config
require('dotenv').config();
require('./config/database'); 
//passport middleware
require('./config/passport');


const indexRouter = require('./routes/index');
const lakesRouter = require('./routes/lakes');
const reviewsRouter = require('./routes/reviews');
const activitiesRouter = require('./routes/activities');
const picturesRouter = require('./routes/pictures');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//methodoverride
app.use(methodOverride('_method'));
//favicon
// app.use(favicon(path.join(__dirname,'public', 'images','favicon.ico')));


//session mounting
app.use(session({
secret: process.env.SECRET,
resave: false,
saveUninitialized: true
}));
//pasport mounting
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next) {
  res.locals.user = req.user;
  next();
})

app.use('/', indexRouter);
app.use('/lakes', lakesRouter);
app.use('/', reviewsRouter);
app.use('/', activitiesRouter);
app.use('/', picturesRouter);

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
