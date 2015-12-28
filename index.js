var express = require('express');
var app = express();

var request = require('request');

var MAPS_KEY = process.env.MAPS_KEY;
console.log("***" + MAPS_KEY);
var DATA_KEY = process.env.DATA_KEY;
var NODE_ENV = process.env.NODE_ENV || 'development';
var BASE_URL = (NODE_ENV === 'production') ? 'https://ractrac.herokuapp.com' : 'http://localhost:3000';
app.use(express.static(__dirname + '/public'))
// app.set('view engine', express)

app.get('/', function(req, res){
  res.render('index');
});

app.get('/api', function(req, res){
  var linkrel2 = 'https://maps.googleapis.com/maps/api/js?key=';
  var linkrel3 = MAPS_KEY + '&signed_in=true&libraries=places&callback=initMap ';
  var superRel = linkrel2+linkrel3;
  request(superRel, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Show the HTML for the Google homepage.
      res.send(body);
    }
  })


});


app.listen(process.env.PORT || 3000);
