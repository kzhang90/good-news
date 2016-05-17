var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
require('dotenv').config();

var auth = jwt({
  secret: process.env.MY_SECRET,
  // req.payload will hold the signed JWT
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

// if someone tries to go to profile, compare jwt.
// send user back in JSON
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;