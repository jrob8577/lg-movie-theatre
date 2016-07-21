var express = require('express');
var router = express.Router();

var Showtimes = require('showtimes')

router.get('/:zipCode', function(req, res, next) {
  var api = new Showtimes(req.params.zipCode, {})
    
 api.getTheaters(function (err, theaters) {
   api.getMovie((theaters[0].movies[0].id), function (err, movie) {
     if (err) {res.send( err )}
     else {res.send( movie )}
       })
     })
 });


module.exports = router;