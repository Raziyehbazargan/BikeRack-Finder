$(document).ready(function(){
var rackObj = {
  rackData: null,
  shortList: [],
  callData: $.getJSON('https://data.seattle.gov/resource/fxh3-tqdm.json?$limit=3000').done(function(){
    console.log("got data");
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
      if (netDistance(userLat, userLong, parseFloat(rack[i].latitude), parseFloat(rack[i].longitude)) < distance){
        this.shortList.push(rack[i]);
      }
    }
  }

};

rackObj.rackData = rackObj.callData;
console.log("this is the rackObj.rackData array:");
console.log(rackObj.rackData);
console.log("this is the responseJSON:");

function logger(){
  console.log(rackObj.rackData.responseJSON);
}
function delayedAlert(){
  window.setTimeout(logger, 5000);
}
delayedAlert();

console.log("this is a test of closeRacksFinder:");
console.log(rackObj.closeRacksFinder(47.6675, -122.3761, 500));

});
