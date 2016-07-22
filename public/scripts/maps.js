var map;
var myLatLng = {lat: 37.8, lng: -122};

function initMap() {
  map = new google.maps.Map( document.getElementById( 'map' ), {
    center: myLatLng,
    zoom: 12
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}

function findTheater( streetNumber ) {
  return theaters.find( function( theater ) {
    return theater.address.startsWith( streetNumber )
  })
}

function theaterContent( theater ) {
  return "<a href='/theaters/id/" + theater.id + "'>Showtimes</a>"
}

function addPin( result, status ) {
  if( status === google.maps.GeocoderStatus.OK ) {
    var streetNumber = result[ 0 ].address_components[ 0 ].long_name
    var theaterGuess = findTheater( streetNumber )

    var infoWindow = new google.maps.InfoWindow({
      content: theaterContent( theaterGuess )
    })

    var marker = new google.maps.Marker({
      map: map,
      position: result[0].geometry.location,
      title: theaterGuess.name
    })

    marker.addListener( 'click', function() {
      infoWindow.open( map, marker )
    })
  }
}

function geocodeTheaters( theaterResponse ) {
  var geocoder = new google.maps.Geocoder()

  theaterResponse.forEach( function( theater ) {
    geocoder.geocode({ address: theater.address }, addPin )
  })
}

var theaters = []

function refreshMap( zipCode ) {
  $.get( '/theaters/' + zipCode, function ( response ) {
    theaters = response

    geocodeTheaters( response )

    // response.forEach( function( element, index, array ) {
    //   geocoder.geocode(response[index].address)
    // )}
  })
};

// function codeAddress() {
//   var address = document.getElementById("address").value;
//   geocoder.geocode( { 'address': address}, function(results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       map.setCenter(results[0].geometry.location);
//       var marker = new google.maps.Marker({
//         map: map,
//         position: results[0].geometry.location
//       });
//     } else {
//       alert("Geocode was not successful for the following reason: " + status);
//     }
//   });
// }

$(document).ready( function() {
  $('.navbar-form button').on( 'click', function( event ) {
    event.stopPropagation();
    refreshMap( $('.navbar-form input').val() )

    return false
  });

  refreshMap( 94607 );
});


// console.log( index, element );
