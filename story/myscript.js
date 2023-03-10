// Based on the info windows with a max width template 
// Multiple markers modified from https://www.codexworld.com/google-maps-with-multiple-markers-using-javascript-api/
// labeling points in order of destination
const labels = "123456789";
let labelIndex = 0;

function initMap() {
     var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'hybrid'
    };
   map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
     // Adding the polyline for my favourite hiking trail during the trip
     // Wanted to add additional polylines showing other hikes but ran out of time
       const favouriteHikeCoordinates = [
{lat: 57.145854, lng: -4.675464},
{lat: 57.137485, lng: -4.668029},
{lat: 57.144918, lng: -4.648968},
{lat: 57.133606, lng: -4.660087},
{lat: 57.152673, lng: -4.595358},
{lat: 57.155485, lng: -4.596477},
{lat: 57.160522, lng: -4.562476},
{lat: 57.178018, lng: -4.556652},
{lat: 57.184075, lng: -4.532725},
{lat: 57.179809, lng: -4.521863},
{lat: 57.195249, lng: -4.506437},
{lat: 57.196443, lng: -4.508798},
{lat: 57.200536, lng: -4.510372},
{lat: 57.204217, lng: -4.503458},
{lat: 57.209826, lng: -4.506910},
{lat: 57.240433, lng: -4.498668},
{lat: 57.257436, lng: -4.484129}
  ];
  const hikePath = new google.maps.Polyline({
    path: favouriteHikeCoordinates,
    geodesic: true,
    strokeColor: "#FFF",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  hikePath.setMap(map);
     
// the 9 points I'm highlighting. Would do more but ran out of time. Wanted to add images if I had time but could not. 
  
  var markers = [
    ['Dingle, Ireland', 53.316, -7.698],
       ['Giants Causeway, Northern Ireland', 55.233, -6.526],
    ['Loch Ness, Scotland', 57.184, -4.495],
       ['London, England', 51.493, -0.113],
       ['Brugge, Belgium', 51.198, 3.209],
       ['Warsaw, Poland', 52.234, 21.014],
       ['Bled, Slovenia', 46.366, 14.112],
       ['Vienna, Austria', 48.206, 16.313],
       ['Athens, Greece', 37.999, 23.726]
       
       
  ];
  
  var infoWindowContent =[
    ['<div id="info_content">' +
    '<h1>Dingle, Ireland</h1>' +
    '<h3> Length of Stay: 1 1/2 weeks </h3>'+
    '<div id="bodyContent">' +
    '<p> My favourite part of travelling in Ireland was this little bar we went to near Killarney. We played pool with the local colleges engineering' +
      ' students and learned a lot about the country. There was a dog named Molly that would sit right at the bar. </p>'+
    '</div>'],
           ['<div id="info_content">' +
    '<h1>Giants Causeway, Northern Ireland</h1>' +
    '<h3> Length of Stay: 3 days </h3>'+
    '<div id="bodyContent">' +
    '<p> The Giants Causeway hike was the highlight of Northern Ireland. Not only was the trip getting there an adventure involving incredible people' +
            ' helping us figure out the train system and offering us rides to our hostel in BallyCastle, but the hike itself to the Giants Causeway was incredible </p>'+
    '</div>'],
    ['<div id="info_content">' +
    '<h1>Loch Ness, Scotland</h1>' +
    '<h3> Length of Stay: 1 week </h3>'+
    '<div id="bodyContent">' +
    '<p> The hike around Loch Ness was the longest hike of this trip and completed in the pouring rain. Although we were miserable at the end, we thoroughly enjoyed the' +
     ' experience. We did not see Nessie.. </p>'+
    '</div>'],
           ['<div id="info_content">' +
    '<h1>London, England</h1>' +
    '<h3> Length of Stay: 1 week </h3>'+
    '<div id="bodyContent">' +
    '<p> Meeting my extended family for the first time was the main highlight from this part of our trip but a close second was seeing Come From Away in the theater. Increbile. </p>'+
    '</div>'],
           ['<div id="info_content">' +
    '<h1>Brugge, Belgium</h1>' +
    '<h3> Length of Stay: 4 days </h3>'+
    '<div id="bodyContent">' +
    '<p> The city is gorgeous with the old cobble stone roads and canals. No trip to Brugge is complete without getting frites and waffles! </p>'+
    '</div>'],
          ['<div id="info_content">' +
    '<h1>Warsaw, Poland</h1>' +
    '<h3> Length of Stay: 2 weeks </h3>'+
    '<div id="bodyContent">' +
    '<p> This was a strange one. We needed to find an embassy so we could vote in the Canadian election and somehow chose Warsaw. We did not do much here but we did find approximately 100$ and try to give it to someone which then made them think we were very very strange. Communication barrier. </p>'+
    '</div>'],
             ['<div id="info_content">' +
    '<h1>Bled, Slovenia</h1>' +
    '<h3> Length of Stay: 3 days </h3>'+
    '<div id="bodyContent">' +
    '<p> We did a beautiful hike around some water falls. Jenny made an entrance by falling into the pub which to this day still reminds me of Aragorn in LOTR entering Helms Deep</p>'+
    '</div>'],
              ['<div id="info_content">' +
    '<h1>Vienna, Austria</h1>' +
    '<h3> Length of Stay: 3 days </h3>'+
    '<div id="bodyContent">' +
    '<p> An amazing hike once again! Such great views! I got over my fear (temporarily) of heights to take the gondola, so worth it </p>'+
    '</div>'],
          ['<div id="info_content">' +
    '<h1>Athens, Greece</h1>' +
    '<h3> Length of Stay: 5 days </h3>'+
    '<div id="bodyContent">' +
    '<p> This one was not so great. A Lady hexed me for not taking her rose... The Christmas Cafe was worth it though</p>'+
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
            title: markers[i][0],
             // trying to add labels to show the order the places were visited
             label: labels[labelIndex++ % labels.length]
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

    // Set zoom level to 3 so all points are visible when the map first loads
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(3);
        google.maps.event.removeListener(boundsListener);
    });
}

window.initMap = initMap;

