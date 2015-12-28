// var linkrel2 = 'https://maps.googleapis.com/maps/api/js?key=';
// var linkrel3 = MAPS_KEY + '&signed_in=true&libraries=places&callback=initMap ';
//
// var superRel = linkrel2+linkrel3;

var s = document.createElement("script");
s.type = "text/javascript";
s.src = "/api";
s.innerHTML = null;
document.getElementsByTagName("head")[0].appendChild(s);
