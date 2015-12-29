
// add an array to store markers that added on map from shortList aaray
var mapMakers = [];
var bikeRackIcon = '../img/Icons/Bike.png'


var rackObj = {
  rackData: null,
  shortList: [],
  distance: 500,
  distanceEl: document.getElementById("distance"),
  sliderEl: document.getElementById("slider"),
  txtinEl: document.getElementById('txtin'),
  callData: $.getJSON('https://data.seattle.gov/resource/fxh3-tqdm.json?$limit=3000').done(function(){
    rackObj.rackData = rackObj.callData;
  }),
  //returns net distance between user and rack in feet.
  netDistance: function(userLat, userLong, rackLat, rackLong){
    var yDist;
    var xDist;
    yDist = rackLat - userLat;
    xDist = rackLong - userLong;
    //because the length of a latitudinal degree is different from the length of a longitudinal degree, we need to convert to a standard unit.  In this case, feet. I assume Seattle's lat of approx 47.6 degrees.
    yDist = Math.floor(yDist * 364771.26);
    xDist = Math.floor(xDist * 246819.84);
    return Math.sqrt(yDist * yDist + xDist * xDist);
  },
  //pushes nearby racks to the shortList array.
  closeRacksFinder: function(userLat, userLong, distance){
    this.shortList = [];
    for (var i =0; i < this.rackData.responseJSON.length; i++){
      var rack = this.rackData.responseJSON;
      if (this.netDistance(userLat, userLong, parseFloat(rack[i].latitude), parseFloat(rack[i].longitude)) < distance){
        this.shortList.push(rack[i]);
      }
    }
  },
  rackMarker: function(rack){
    var latLng = {lat: parseFloat(rack.latitude), lng: parseFloat(rack.longitude)};
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: "Distance from you: " + rackObj.netDistance(uLat, uLong, latLng.lat, latLng.lng) + " feet.",
      icon:bikeRackIcon
    })
    mapMakers.push(marker);
  },
  racksMapper: function(){
    for (var i = 0; i < this.shortList.length ; i++){
      this.rackMarker(this.shortList[i]);
    }
  }
}

function removeBikeRacksMarkers(){
  for (var i=0; i < mapMakers.length; i++) {
    mapMakers[i].setMap(null);
  }
}
//remove all markers of nearest bike rack from map
document.getElementById('clearMap').addEventListener('click',function(){
  removeBikeRacksMarkers();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
});
document.getElementById('slider').addEventListener('click',function(){
  removeBikeRacksMarkers();
});
