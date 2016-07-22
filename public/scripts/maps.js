var map;
var myLatLng = {lat: 37.8, lng: -122};

function initMap() {
  map = new google.maps.Map( document.getElementById( 'map' ), {
    center: myLatLng,
    zoom: 8
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}
