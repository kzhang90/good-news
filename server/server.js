var express = require('express');
var app = express();

var path = require('path');
var favicon = require('serve-favicon');


var methodOverride = require('method-override');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

// bring in models
require('./models');
// bring in passport config
require('./config/passport');
require('dotenv').config();

var routesApi = require('./routes/index');

app.set('superSecret', 'teehee');
app.set('view engine', 'jade');
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/css', express.static(path.join(__dirname, '../client/css')));
app.use('/js', express.static(path.join(__dirname, '../client/js')));
app.use('/partials', express.static(path.join(__dirname, '../client/views/partials')));
// initialize passport before using the route middleware
app.use(passport.initialize());
app.use('/api', routesApi)

//catch errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({'message': err.name + ': ' + err.message});
  }
});

app.get('/key', function(req, res) {
  res.json({key: process.env.ALCHEMY_API_KEY});
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/views', 'index.html'))
});

var PORT = 3001;
app.listen(PORT, function() {
  console.log('listening on localhost:', PORT)
});

module.exports = app;
