var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
require('dotenv').config();
// saving user pswrd is bad because of db hax
var userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true},
  email: { type: String, unique: true, required: true},
  admin: Boolean,
  imageUrl: String,
  hash: String,
  salt: String
});
// instance methods below. 
// use this method when creating a user
userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pdkdf2Sync(password, this.salt, 1000, 64).toString('hex');
}
userSchema.methods.validPassword = function(password) {
  var hash = crypto.pdkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
}
userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    // set secret as an environment variable.
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.MY_SECRET);
}

module.exports = mongoose.model('User', userSchema);

