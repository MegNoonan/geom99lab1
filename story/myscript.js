// Based on the info windows with a max width template 
// Multiple markers modified from https://www.codexworld.com/google-maps-with-multiple-markers-using-javascript-api/

function initMap() {
  
  //const ireland = { lat: 53.316, lng: -7.698 };
  var bounds = new google.maps.LatLngBounds();
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
     mapTypeId: google.maps.MapTypeId.TERRAIN
  });
  var markers = [
    ['Dingle, Ireland', 53.316, -7.698],
    ['Inverness, Scotland', 57.456, -4.221]];
  
  var infoWindowContent =
    ['<div id="content">' +
    '<h1>Dingle, Ireland</h1>' +
    '<h3> Travel Dates: August 23 to December 29' +
    '<div id="bodyContent">' +
    '<p> My favourite part of travelling in Ireland was this little bar we went to near Killarney. We played pool with the local colleges engineering' +
      ' students and learned a lot about the country. There was a dog named Molly that would sit right at the bar. </p>'+
    '</div>'],
        ['<div id="content">' +
    '<h1>Inverness, Scotland</h1>' +
    '<h3> Travel Dates: August 23 to December 29' +
    '<div id="bodyContent">' +
    '<p> My favourite part of travelling in Ireland was this little bar we went to near Killarney. We played pool with the local colleges engineering' +
      ' students and learned a lot about the country. There was a dog named Molly that would sit right at the bar. </p>'+
    '</div>']
  ];
  
      // Add multiple markers to map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Place each marker on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
      
// Add info window to marker    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Center the map to fit all markers on the screen
        map.fitBounds(bounds);
    }

    // Set zoom level
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });
}

window.initMap = initMap;

