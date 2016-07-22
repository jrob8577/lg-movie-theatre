var express = require('express');
var router = express.Router();

var Showtimes = require('showtimes')


router.get('/:zipCode', function(req, res, next) {
  var api = new Showtimes( req.params.zipCode, {})

  api.getTheaters( function ( error, theaters ) {
    if (error) {
      res.send( error )
    } else {
      res.send( theaters )
    }
  });
});

router.get('/id/:id', function( request, response, next ) {
  var api = new Showtimes()

  api.getTheater( request.params.id, function( error, theater ) {
    if( error ) {
      response.send( error )
    } else {
      response.render( 'theater', theater )
    }
  })
});

module.exports = router;
