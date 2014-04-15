Template.gmapLanding.rendered = function() {
  var canvas = this.find('#map-canvas');

  map = new google.maps.Map(canvas, gmapOptions);   
  
  map.setZoom(8);
  map.setCenter(new google.maps.LatLng(-33.85692999999974, 151.21528));
  
};