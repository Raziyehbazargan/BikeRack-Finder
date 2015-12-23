var rackObj = {
  rackData: null,
  shortList: [],
  distance: 500,
  distanceEl: document.getElementById("distance"),
  sliderEl: document.getElementById("slider"),
  callData: $.getJSON('https://data.seattle.gov/resource/fxh3-tqdm.json?$limit=3000').done(function(){
    console.log("got data");
    rackObj.rackData = rackObj.callData;
    console.log("this is the responseJSON:");
    console.log(rackObj.rackData.responseJSON);
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
  //creates new short list based upon slider value - still needs to include a mapping function.
  getDistance: this.sliderEl.addEventListener('submit', function(e){
    e.preventDefault;
    this.distance = parseInt(this.sliderEl.value);
    marker.setMap(null);
    closeRacksFinder(uLat, uLong, this.distance);
  })

};
