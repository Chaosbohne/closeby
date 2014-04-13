LandingPageController = RouteController.extend({

  data: function() { 
    var sw = new google.maps.LatLng(-34.89410255169253, 150.039751953125);
    var ne = new google.maps.LatLng(-33.89692705065752, 151.248248046875);
    
    return {
      sw : sw,
      ne : ne,
    };
  } 
});

