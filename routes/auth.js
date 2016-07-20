var express = require('express');
var router = express.Router();

/* GET auth page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Log On' });
});

router.get('/logout', function(req, res, next) {
  res.send('this is a test of the logout endpoint');
});

router.get('/callback', function(req, res, next) {
  res.send('this is a test of the callback endpoint');
});


module.exports = router;
