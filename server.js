var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/router');
var path = require('path')

mongoose.connect('mongodb://localhost/test');
app.use(express.static('public'))
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database success');
});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


app.use('/api', routes);
app.use('/temp', routes);
app.use('/light', routes);
app.get('*', routes);

app.listen(port);
console.log('Listening on port ' + port);