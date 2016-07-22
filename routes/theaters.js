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

function normalizedShowtimes( movie ) {
  const tickets = movie.showtime_tickets

  return Object.assign( movie, {
    showtimes: movie.showtimes.map( function( showtime ) {
      return {
        time: showtime,
        ticketUrl: tickets[ showtime ]
      }
    })
  })
}

function normalizedMovies( theater ) {
  return {
    movies: theater.movies.map( normalizedShowtimes )
  }
}

router.get('/id/:id', function( request, response, next ) {
  var api = new Showtimes()

  api.getTheater( request.params.id, function( error, theater ) {
    if( error ) {
      response.send( error )
    } else {
      response.render(
        'theater',
        Object.assign( theater, normalizedMovies( theater ) )
      )
    }
  })
});

module.exports = router;
