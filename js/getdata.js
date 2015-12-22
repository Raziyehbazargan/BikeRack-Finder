var rackObj = {
  rackData: null,
  shortList: [],
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
  }

};
