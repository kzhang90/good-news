var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true},
  password: String,
  admin: Boolean,
  imageUrl: String
});

module.exports = mongoose.model('User', userSchema);

