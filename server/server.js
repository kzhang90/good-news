var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var morgan = require("morgan");
var path = require("path");
var db = require("./models");
var env = require("dotenv").config();
// process.env

var ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

app.set("view engine", "jade");
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:true}));
app.use("/css", express.static(path.join(__dirname, "../client/css")));
app.use("/js", express.static(path.join(__dirname, "../client/js")));
app.use("/partials", express.static(path.join(__dirname, "../client/views/partials")));

app.get("/a", function(req,res) {
  res.json({key: ALCHEMY_API_KEY});
});

app.get("*", function(req,res) {
  res.sendFile(path.join(__dirname, '../client/views', 'index.html'))
});

var PORT = 3001;
app.listen(PORT, function() {

  console.log("listening on localhost:", PORT)
});
