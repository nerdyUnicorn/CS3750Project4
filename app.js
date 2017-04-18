var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//const history = require('vue-history-api-fallback');
//const historyOptions = require('./src/main.js');
//var history = require('connect-history-api-fallback');
const fallback = require('express-history-api-fallback');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

var users = require('./routes/users');
var api = require('./routes/api');

var app = express();


// mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CS3750Project4');

// create a persisent session store re-using our mongoose connection
// It creates/uses a collection called "sessions" by default
const sessionStore = new MongoStore({ mongooseConnection: mongoose.connection });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express session
// needed by Express Messages and Passport
app.use(session({
  secret: 'secret',
  resave: false,
  store: sessionStore,
  saveUninitialized: true
}));

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// Expose isLoggedIn boolean in templates
//app.use(function(req, res, next) {
//  res.locals.isloggedIn = (req.user) ? true : false;
//  next();
//});
app.use(function (req, res, next) {
  res.locals.isLoggedIn = req.isAuthenticated();
  next();
});

// Express Flash Messages with pug
app.use(require('connect-flash')());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express validator
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
      const namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.use('/users', users);

// setup HTML5 History Mode for SPAs
const root = (path.join(__dirname, 'public'));
app.use(fallback('index.html', { root: root }))


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
module.exports.sessionStore = sessionStore;
