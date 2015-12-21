var rackObj = {
  rackData: [],
  callData: $.get('https://data.seattle.gov/resource/fxh3-tqdm.json').done(function(){
    console.log("got data");
  }),
  netDistance: function(userLat, userLong, rackLat, rackLong){
    var yDist;
    var xDist;
    if (rackLat - userLat > 0){
      yDist = rackLat - userLat;
    } else {
      yDist = userLat - rackLat
    }
    if (rackLong - userLong > 0){
      xDist = rackLat - userLat;
    } else {
      xDist = userLat - rackLat;
    }
    return Math.sqrt(yDist * yDist + xDist * xDist)
  }
  // checkCall: $.ajax('https://data.seattle.gov/resource/fxh3-tqdm.json',
  // // {
  //   method: "GET",
  //   success: function (data, textstatus, jqXHR){
  //     console.log("AJAX request successful!");
  //   }
  // }
  // ),

};

rackobj.rackData = rockObj.callData();
