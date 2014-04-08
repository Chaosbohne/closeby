Template.gmap.rendered = function() {
  
  $('#sidebar').affix({
    offset: {
      top: $('header').height(),
      bottom: $('footer').height()
    }
  });    

  $('#sidebar').on('affix-bottom.bs.affix', function() {
    console.log('AFFIX TO BOTTOM');
  });
  
  if(Session.get('isMap'))
    return;  
  
  var sw = new google.maps.LatLng(-34.89410255169253, 150.039751953125);
  var ne = new google.maps.LatLng(-33.89692705065752, 151.248248046875);
  
  var bounds;
  
  var user = Meteor.user();
  
  if(user) {
    sw = new google.maps.LatLng(user.profile.locs[0].lat, user.profile.locs[0].lng);
    ne = new google.maps.LatLng(user.profile.locs[1].lat, user.profile.locs[1].lng);  
  }
  
  bounds = new google.maps.LatLngBounds(sw, ne);
  
  var myStyles =[
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];  
  
  var mapOptions = {
    zoom: 8,
    panControl: false,
    zoomControl: false,
    scaleControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    overviewMapControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: myStyles
  };
  
  /* Rezising map on window-size change */
  
  
    function resizer() {
      $('#map-canvas').height($('#map-canvas').width());
    };  
    
    $(window).resize(resizer);  
    $('#map-canvas').height($('#map-canvas').width());
    
  
  /* Add advanced properties to GMAPS-Object, to handle markers */ 
  google.maps.Map.prototype.markers = new Array();
  
  google.maps.Map.prototype.addMarker = function(marker) {
    this.markers[this.markers.length] = marker;
  };
  
  google.maps.Map.prototype.getMarkers = function() {
    return this.markers
  };
  
  google.maps.Map.prototype.clearMarkers = function() {
    for(var i=0; i<this.markers.length; i++){
      this.markers[i].setMap(null);
    }
    this.markers = new Array();
  };  
  
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);   
  
  map.fitBounds(bounds);
  
  function setDiscoverLocs() {
    
    if(map) {
      var sw = map.getBounds().getSouthWest();
      var ne = map.getBounds().getNorthEast();
      
      var discoverLocs = {'discoverLocs': [
        {lng : sw.lng(), lat : sw.lat()},
        {lng : ne.lng(), lat : ne.lat()}
      ]};    
      
      Meteor.call('setDiscoverLocs', discoverLocs);
    }
    
  }  
  
  function openCreatePostModal(event) {
    var latLng = event.latLng;
    
    Session.set('mapClickedEvent', {locs : {lat : latLng.lat(), lng : latLng.lng()}});
    
    $('#createPostModal').modal('show');
  }
  
  if(user) {
    google.maps.event.addListener(map, "idle", setDiscoverLocs);     
    google.maps.event.addListener(map, "click", openCreatePostModal);   
  }
  
  Session.set('isMap', true);    
  
  //    <input id="pac-input" class="controls" type="text" placeholder="Search Box">
  //var input = (document.getElementById('pac-input'));
  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  //searchBox = new google.maps.places.SearchBox((input));  
  
  //google.maps.event.addListener(searchBox, 'places_changed', function() {
  // var places = searchBox.getPlaces();
  
  //var bounds = new google.maps.LatLngBounds();
  
  //map.fitBounds(bounds);
  //});  
  // :)    
  //}
};

Template.gmap.created = function() {
  Session.set('isMap', false);
}

Template.gmap.destroyed = function() {
  Session.set('isMap', false);

  //s$(window).off("resize", resizer);
};