var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

var githubUrl = 'https://github.com/login/oauth/authorize?'
var githubTokenRequest = 'https://github.com/login/oauth/access_token'

var githubAuthorizeUrl = function() {
  return githubUrl + 'client_id=' +
    process.env.GITHUB_CLIENT_ID + '&scope=user user:email'
}

var githubParameters = function( code ) {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
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

var completeLogin = function( githubResponse, session, response ) {
  var redirect_to = session.redirect_after_auth
  session.github_access_token = githubResponse.access_token

  if( redirect_to ) {
    session.redirect_after_auth = undefined
    response.redirect( redirect_to )
  } else {
    response.render( 'home' )
  }
}

/* GET auth page. */
router.get('/login', function(req, res, next) {
  req.session.redirect_after_auth = req.get( 'referrer' )
  res.redirect( githubAuthorizeUrl() );
});

router.get('/logout', function( req, res, next) {
  req.session.destroy()
});

router.get('/callback', function(req, res, next) {
  fetch( githubTokenRequest, githubParameters( req.query.code) )
    .then( function( response ) {
      return response.text()
    })
    .then( function( body ) {
      completeLogin( convertResponseToObject( body ), req.session, res )
    })
    .catch( function( error) {
      // TODO: Do something with this error
      res.send( error )
    })
});

module.exports = router;
