var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var cors = require('cors');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var cookieSession = require('cookie-session');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.use(morgan('combined'));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['lkasjdfl;kdslfksdflkalkfkl']
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
