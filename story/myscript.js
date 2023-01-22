// Based on the info windows with a max width template 
// Multiple markers modified from https://www.codexworld.com/google-maps-with-multiple-markers-using-javascript-api/

function initMap() {
     var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'terrian'
    };
   map = new google.maps.Map(document.getElementById("map"), mapOptions);
                             
  //const ireland = { lat: 53.316, lng: -7.698 };
  //var bounds = new google.maps.LatLngBounds();
  //var map = new google.maps.Map(document.getElementById("map"), {
    //zoom: 3,
     //mapTypeId: google.maps.MapTypeId.TERRAIN
  
  var markers = [
    ['Dingle, Ireland', 53.316, -7.698],
       ['Giants Causeway, Northern Ireland', 55.233, -6.526],
    ['Inverness, Scotland', 57.456, -4.221],
       ['London, England', 51.493, -0.113],
       ['Brugge, Belgium', 51.198, 3.209]
  ];
  
  var infoWindowContent =[
    ['<div id="info_content">' +
    '<h1>Dingle, Ireland</h1>' +
    '<h3> Length of Stay: 4 days' </h3>+
    '<div id="bodyContent">' +
    '<p> My favourite part of travelling in Ireland was this little bar we went to near Killarney. We played pool with the local colleges engineering' +
      ' students and learned a lot about the country. There was a dog named Molly that would sit right at the bar. </p>'+
    '</div>'],
           ['<div id="info_content">' +
    '<h1>Inverness, Scotland</h1>' +
    '<h3> Length of Stay: 4 days' </h3>+
    '<div id="bodyContent">' +
    '<p> The Giants Causeway hike was the highlight of Northern Ireland. Not only was the trip getting there an adventure involving incredible people' +
            ' helping us figure out the train system and offering us rides to our hostel in BallyCastle, but the hike itself to the Giants Causeway was incredible </p>'+
    '</div>'],
    ['<div id="info_content">' +
    '<h1>Inverness, Scotland</h1>' +
    '<h3> Length of Stay: 4 days' </h3>+
    '<div id="bodyContent">' +
    '<p> The hike around Loch Ness was the longest hike of this trip and completed in the pouring rain. Although we were miserable to the end, we thoroughly enjoyed the' +
     ' experience. We did not see Nessie.. </p>'+
    '</div>'],
           ['<div id="info_content">' +
    '<h1>London, England</h1>' +
    '<h3> Length of Stay: 4 days' </h3>+
    '<div id="bodyContent">' +
    '<p> Meeting my extended family for the first time was the main highlight from this part of our trip but a close second was seeing Come From Away in the theater. Increbile. </p>'+
    '</div>'],
           ['<div id="info_content">' +
    '<h1>Brugge, Belgium</h1>' +
    '<h3> Length of Stay: 4 days' </h3>+
    '<div id="bodyContent">' +
    '<p> The city is gorgeous with the old cobble stone roads and canals. No trip to Brugge is complete without getting frites and waffles! </p>'+
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
        this.setZoom(3);
        google.maps.event.removeListener(boundsListener);
    });
}

window.initMap = initMap;

