var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/router');
var path = require('path')
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

require('./models/Models');

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
app.set('view engine', 'ejs');  


mongoose.connect('mongodb://heroku_pt1cf244:Tkss00ll@ds163360.mlab.com:63360/heroku_pt1cf244');
app.use(express.static(path.join(__dirname, 'public')));

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database success');
});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

require('./routes/router')(app, passport);
require('./config/passport')(passport);

app.listen(port);
console.log('Listening on port ' + port);
