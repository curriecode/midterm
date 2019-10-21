/* eslint-disable no-undef */
/* eslint-disable func-style */


function initAutocomplete() {
  let map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 49.2827,
      lng: -123.1207
    },
    zoom: 10,
    // mapTypeId: 'roadmap',
    styles:
    [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#263c3f"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6b9a76"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#38414e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#212a37"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9ca5b3"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#1f2835"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#f3d19c"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2f3948"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#515c6d"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      }
    ]
  });
  // Create the search box and link it to the UI element.
  let input = document.getElementById('pac-input');
  let searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  //every search object is here, maybe connect to an event handler so only locations that user WANTS saved is added to this array
  let allPlaces = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    let places = searchBox.getPlaces();

    //Here we can see the full name of location, images, ect!! might be more useful than geocoding!!!!!!
    console.log("places", places);

    if (places.length === 0) {
      return;
    }

    let bounds = new google.maps.LatLngBounds();

    //peep the console here after every search
    console.log("all Places ", allPlaces, allPlaces.length);


    places.forEach(function(place) {
      //saves each search to the array, maybe connect to an event handler so only locations that user WANTS saved is added to this array
      allPlaces.push(places[0]);


      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    map.fitBounds(bounds);

    displayLocations(allPlaces, map);

  });
}

function displayLocations(locations, map) {
  //displays info-window on all locations on click
  locations.forEach(function(place) {

    let placeAddress = place.formatted_address;
    let name = place.name;

    let contentString = `
        <h1>${name}</h1>
        <p>${placeAddress}</p>
        <button>Add location</button>`;

<<<<<<< HEAD
      //creates info marker for each location
      let infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      //creates a marker for each location
      let marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: name,
        icon: 'https://i.ibb.co/qYvvDXn/red-marker.png',
        animation: google.maps.Animation.BOUNCE,
      });

      //event listener for each marker
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
=======
    //creates info marker for each location
    let infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    //creates a marker for each location
    let marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: name
    });

    //event listener for each marker
    marker.addListener('click', function () {
      infowindow.open(map, marker);
>>>>>>> 207cca82c8eeed011889ffab36b26d3c4a6002e0
    });
  });
}




