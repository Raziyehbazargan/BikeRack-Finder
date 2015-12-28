var express = require('express');
var app = express();

var MAPS_KEY = process.env.MAPS_KEY;
console.log("***" + MAPS_KEY);
var DATA_KEY = process.env.DATA_KEY;
var NODE_ENV = process.env.NODE_ENV || 'development';
var BASE_URL = (NODE_ENV === 'production') ? 'htps://ractrac.herokuapp.com' : 'http://localhost.3000';
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')

app.get('/', function(req, res){
  res.render('index');
});

app.listen(process.env.PORT || 3000);
