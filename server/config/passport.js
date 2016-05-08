var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

// for a local strategy (e.g. facebook, oauth)
// need to write a mongoose query on the User model
passport.use(new LocalStrategy({
  usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // if password is wrong
      // use user instance method from user model
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        })
      }
      // if credentials are correct return the user obj
      return done(null, user);
    })
  }
)