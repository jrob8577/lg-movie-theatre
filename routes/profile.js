var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

var githubUserUrl = 'https://api.github.com/user'
var userParams = function( token ) {
  return {
    method: 'GET',
    headers: {
      'Authorization': 'token ' + token
    }
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  if( ! req.session.user_data_loaded ) {
    fetch( githubUserUrl, userParams( req.session.github_access_token ) )
      .then( function( response ) {
        return response.json();
      })
      .then( function( data ) {
        req.session.user_data = {
          name: data.name,
          email: data.email,
          avatar: data.avatar_url
        }
        req.session.user_data_loaded = true

        req.session.save()

        res.render( 'profile', req.session.user_data )
      })
      .catch( function( error ) {
        res.send( error )
      })
  } else {
    res.render( 'profile', req.session.user_data );
  }
});

module.exports = router;
