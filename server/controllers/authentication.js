// using user model, what to send back etc.
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
// code needs error traps
// validate form inputs
// catch errors in the save function
module.exports.register = function(req, res) {
  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token = user.generateJwt();
    res.status(200);
    res.json({
      'token': token
    });
  });
}

module.exports.login = function(req, res) {
// add clientside validations here
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    if (user) {
      var token = user.generateJwt();
      res.status(200);
      res.json({
        'token': token
      });
    } else {
      // what does info mean right here?
      res.status(401).json(info);
    }
  });
}