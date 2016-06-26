function initMap (myLatLng, myCity) {
  // Create a map object and specify the DOM element for display.
  if (myLatLng && myCity) {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      scrollwheel: true,
      zoom: 8
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: myCity
    });
  } else {
    console.log('no data existinggggg');
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.611435, lng: -122.330456},
      scrollwheel: true,
      zoom: 8
    });
  }
  // TODO: Follow the Google Maps API docs to create markers on the map based on the search options on the home page.
}
