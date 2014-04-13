Template.gmapLanding.rendered = function() {
  var canvas = this.find('#map-canvas');

  var sw = new google.maps.LatLng(-34.89410255169253, 150.039751953125);
  var ne = new google.maps.LatLng(-33.89692705065752, 151.248248046875);

  var bounds = new google.maps.LatLngBounds(sw, ne);

  map = new google.maps.Map(canvas, gmapOptions);   

  map.fitBounds(bounds);
};