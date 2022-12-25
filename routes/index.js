const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */

router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Lakes Blog' });
  res.redirect('/lakes/login')
});

//oauth login route
router.get('/auth/google', passport.authenticate(
  //whicch strategy is being used?
  'google',
  {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/lakes',
    // Change to what's best for YOUR app
    failureRedirect: '/lakes/login'
  }
));

router.get('/logout', function(req, res) {
  req.logout(function() {
    // Change path for your "landing" page
    res.redirect('/lakes/login');
  });
});

module.exports = router;
