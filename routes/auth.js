var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

var githubUrl = 'https://github.com/login/oauth/authorize?client_id=' + process.env.GITHUB_CLIENT_ID
var githubTokenRequest = 'https://github.com/login/oauth/access_token'

var githubParameters = function( code ) {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code
    })
  }
}

var queryStringReducer = function( previous, current, index, array ) {
  var keyValuePair = current.split( '=' )
  previous[ keyValuePair[0] ] = keyValuePair[ 1 ]

  return previous
}

var convertResponseToObject = function( body ) {
  return body.split( '&' ).reduce( queryStringReducer, {} )
}

/* GET auth page. */
router.get('/login', function(req, res, next) {
  res.redirect( githubUrl );
});

router.get('/logout', function(req, res, next) {
  res.send('this is a test of the logout endpoint');
});

router.get('/callback', function(req, res, next) {
  fetch( githubTokenRequest, githubParameters( req.query.code) )
    .then( function( response ) {
      return response.text()
    })
    .then( function( body ) {
      res.set('Content-Type', 'application/json')
      res.send( convertResponseToObject( body ) )
    })
    .catch( function( error) {
      // TODO: Do something with this error
      res.send( error )
    })
});


module.exports = router;
