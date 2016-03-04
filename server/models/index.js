var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/goodnews-db");

mongoose.set("debug", true);

module.exports.Icecream = require("./user");