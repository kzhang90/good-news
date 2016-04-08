var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var path = require('path');
var db = require('./models');
var env = require('dotenv').config();
var jwt = require('jsonwebtoken');
var ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

var apiRoutes = express.Router();
// add /api prefix to all of apiRoutes


app.set('superSecret', 'teehee');
app.set('view engine', 'jade');
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/css', express.static(path.join(__dirname, '../client/css')));
app.use('/js', express.static(path.join(__dirname, '../client/js')));
app.use('/partials', express.static(path.join(__dirname, '../client/views/partials')));
app.use('/api', apiRoutes);

apiRoutes.post('/authenticate', function(req, res) {
  db.User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // jwt.sign(payload, secretOrPrivateKey, options, [callback])
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: '2days'
        });

        res.json({
          success: true,
          message: 'Here is your token.',
          token: token
        });
      }
    }
  });
});

// all routes below here will check for the authenticity of the JWT
// below is saying "use this middleware for these routes"
apiRoutes.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.get('/users', function(req, res) {
  db.User.find({}, function(err, users) {
    res.json(users);
  });
});
// jwt header consists of type of token(jwt), hashing algorithm used, such as HMAC SHA256
// jwt payload

// To create the signature part you have to take the encoded header, 
//  the encoded payload, a secret, the algorithm specified in the header, and sign that.


app.get('/a', function(req, res) {
  res.json({key: ALCHEMY_API_KEY});
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/views', 'index.html'))
});

var PORT = 3001;
app.listen(PORT, function() {

  console.log('listening on localhost:', PORT)
});
