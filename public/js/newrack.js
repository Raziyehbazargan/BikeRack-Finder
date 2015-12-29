var newRacks = {
  address : document.getElementById("pac-input").value,
  geoCode: function (geocoder, resultsMap){
    geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      uLat = results[0].geometry.location.latitude;
      uLong = results[0].geometry.location.longitude;
      
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }

  }
}
