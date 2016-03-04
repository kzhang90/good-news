var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true},
  imageUrl: String
});

var User = mongoose.model("user", userSchema);

module.exports = User;