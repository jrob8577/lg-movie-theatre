var express = require('express');
var router = express.Router();

var githubUrl = 'https://github.com/login/oauth/authorize?client_id=a391c044bd23da0e1193'

/* GET auth page. */
router.get('/login', function(req, res, next) {
  res.redirect( githubUrl );
});

router.get('/logout', function(req, res, next) {
  res.send('this is a test of the logout endpoint');
});

router.get('/callback', function(req, res, next) {

  res.send('this is a test of the callback endpoint');
});


module.exports = router;
