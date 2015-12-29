var uLat;
var uLong;
var latLongStorageArray=[];
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var userPinImg = '../img/Icons/userPin.png'
var map;
var markers = [];

if (window.navigator.geolocation) {
    var failure, success;
    success = function(position) {
      console.log(position);
      console.log(position.coords.latitude);
      uLat = position.coords.latitude;
      uLong = position.coords.longitude;
    };
    failure = function(message) {
      alert('Cannot retrieve location!');
    };
    navigator.geolocation.getCurrentPosition(success, failure, {
      maximumAge: Infinity,
      timeout: 5000
    });
}

function initMap() {
   map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: uLat, lng: uLong},
    zoom: 13
  });

  // ..........................................................................
  // This event listener calls addMarker() when the map is clicked.
  //and check for that local storage is exist or not
  google.maps.event.addListener(map, 'click', function(event) {
    if (localStorage.userMarkers) {
      latLongStorageArray = JSON.parse(localStorage.getItem('userMarkers'));
      latLongStorageArray.push({lat:event.latLng.lat() ,lng:event.latLng.lng()});
      localStorage.setItem('userMarkers', JSON.stringify(latLongStorageArray));
      addMarker(event.latLng); //call addMarker function
    }else {
      latLongStorageArray.push({lat:event.latLng.lat() ,lng:event.latLng.lng()});
      localStorage.setItem('userMarkers', JSON.stringify(latLongStorageArray));
      addMarker(event.latLng); //call addMarker function
    }
    });
    // google.maps.event.addDomListener(window, 'load', initMap);
    // ........................................................................
    //Adding the submit event listener to get access to the mapInit event
  rackObj.distanceEl.addEventListener('submit', function(e, map){
    e.preventDefault();
    rackObj.distance = parseInt(rackObj.sliderEl.value);
    // marker.setMap(null);
    console.log(rackObj.distance);
    rackObj.closeRacksFinder(uLat, uLong, rackObj.distance);
    rackObj.racksMapper(map);

  var geocoder = new.google.maps.Geocoder();

  document.getElementById("pac-input").addEventListener('submit', function(e, geocoder, map){
    e.preventDefault();
    newRacks.geoCode(geocoder, map);
    rackObj.distance = parseInt(rackObj.sliderEl.value);
    rackObj.closeRacksFinder(uLat, uLong, rackObj.distance);
    rackObj.racksMapper(map);
  })

  });

  var input = /** @type {!HTMLInputElement} */(
      document.getElementById('pac-input'));

  var types = document.getElementById('type-selector');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    position: map.center,
    map: map,
    //Person's icon
    title: 'you are here!',
    icon:'../img/Icons/Person.png'

});
//call function
  showMarker();

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
    radioButton.addEventListener('click', function() {
      autocomplete.setTypes(types);
    });
  }

  setupClickListener('changetype-all', []);
  setupClickListener('changetype-address', ['address']);
  setupClickListener('changetype-establishment', ['establishment']);
  setupClickListener('changetype-geocode', ['geocode']);

  // ........................................................................
  // Add the marker at the clicked location on map, and add the label from the array of alphabetical characters.
  function addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      label: labels[labelIndex++ % labels.length],
      map: map,
      icon:userPinImg
    });
    markers.push(marker);
  }

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Hides markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
    // markers[markers.length -1].setMap(null)
  }

  var elclearMarkers = document.getElementById('clearMarkers');
  elclearMarkers.onclick = clearMarkers;

  // Shows any markers currently in the array.
  function showMarkers() {
    setMapOnAll(map);
    console.log('showmarkers clicked');
  }

  var elshowMarkers = document.getElementById('showMarkers');
  elshowMarkers.onclick = showMarkers;

  // Deletes all markers in the array by removing references to them.
  function eraseMarkers() {
    clearMarkers();
    console.log('erasemarkers clicked');
    markers = [];
    // localStorage.removeItem(markers);
    // localStorage.setItem('userMarkers',JSON.stringify(markers));
  }

  var eldeleteMarkers = document.getElementById('noMarkers');
  console.log(eldeleteMarkers);
  // eldeleteMarkers.onclick = deleteMarkers;
  eldeleteMarkers.addEventListener('click',function(){
    eraseMarkers();
    console.log('delete button clicked');
    localStorage.removeItem('userMarkers');
  });

  // ........................................................................
  // show the markers on saved point by user from local storage
  function showMarker() {
    if (localStorage.getItem('userMarkers')) {
      var retrieveData = JSON.parse(localStorage.getItem('userMarkers'));
      for (var i = 0; i < retrieveData.length; i++) {
        var latLngLocal = new google.maps.LatLng(retrieveData[i].lat, retrieveData[i].lng);
        //cal function to add markers on map
        addMarker(latLngLocal)
    }
  }else {
    console.log('not exist');
  }
}
}
