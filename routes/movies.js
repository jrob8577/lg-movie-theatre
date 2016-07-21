var express = require('express');
var router = express.Router();
var Showtimes = require('showtimes')

router.get('/:zipCode-:id-:date', function( request, response, next ) {
  var api = new Showtimes(request.params.zipCode, {date:request.params.date});

  var theater = api.getTheater( request.params.id, function( error, theater ) {
    if( error ) {
      response.send( error )
    } else {
      response.send( theater )
    }
  })
// theater.getMovies(function(error, movies){
// console.log(movies)
// })
// 
});
module.exports = router;


//zipCode/:zipCode/