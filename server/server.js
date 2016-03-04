var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
methodOverride = require("method-override"),
morgan = require("morgan"),
path = require("path"),
db = require("./models"),
// process.env stores all of api keys
dotenv = require('dotenv').config();

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:true}));
app.use("/css", express.static(path.join(__dirname, "../client/css")));
app.use("/js", express.static(path.join(__dirname, "../client/js")));
app.use("/partials", express.static(path.join(__dirname, "../client/views/partials")));

app.get("*", function(req,res) {
  res.sendFile(path.join(__dirname, '../client/views', 'index.html'))
});

var PORT = 3001;
app.listen(PORT, function() {
  console.log("listening on localhost:", PORT)
});
