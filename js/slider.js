//creates new short list based upon slider value - still needs to include a mapping function.
rackObj.txtinEl.value = "600 feet";
rackObj.distanceEl.addEventListener('submit', function(e){
  e.preventDefault();
  rackObj.distance = parseInt(rackObj.sliderEl.value);
  // marker.setMap(null);
  console.log(rackObj.distance);
  // closeRacksFinder(uLat, uLong, this.distance);
  })

rackObj.sliderEl.addEventListener('change', function(e) {
  e.preventDefault();
  rackObj.txtinEl.value = parseInt(rackObj.sliderEl.value);
  console.log(parseInt(rackObj.sliderEl.value));
})

rackObj.txtinEl.addEventListener('change', function(e) {
  e.preventDefault();
  rackObj.sliderEl.value = parseInt(rackObj.txtinEl.value);
  console.log('txtinel changed my value!');
})
