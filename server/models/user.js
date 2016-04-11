var mongoose = require('mongoose');
var crypto = require('crypto');
// saving user pswrd is bad because of db hax
var userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true},
  email: { type: String, unique: true, required: true},
  admin: Boolean,
  imageUrl: String,
  hash: String,
  salt: String
});

module.exports = mongoose.model('User', userSchema);

