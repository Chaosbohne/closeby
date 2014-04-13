Template.gmap.rendered = function() {
  google.maps.event.addDomListener(window, "resize", function() {
    console.log('resize');
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center); 
  });     
}


Template.gmap.destroyed = function() {
  google.maps.event.clearListeners(map, "resize");  
}

/*
Template.gmap.rendered = function() {

  var sw = this.data.sw;
  var ne = this.data.ne;
  
  var user = Meteor.user();
  if(user && this.data) {  
    //if(this.data) {
    console.log(this.data);
    if(this.data.functional_range === 'posts') {
      sw = new google.maps.LatLng(user.profile.locs[0].lat, user.profile.locs[0].lng);
      ne = new google.maps.LatLng(user.profile.locs[1].lat, user.profile.locs[1].lng); 
    }
    //}
  }else {
    
  }

  var bounds = new google.maps.LatLngBounds(sw, ne);
  

  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);   
  
  map.fitBounds(bounds);
    
  if(this.data.functional_range === 'posts') {
    function setDiscoverLocs() {
      var sw = map.getBounds().getSouthWest();
      var ne = map.getBounds().getNorthEast();
      
      var discoverLocs = {'discoverLocs': [
        {lng : sw.lng(), lat : sw.lat()},
        {lng : ne.lng(), lat : ne.lat()}
      ]};    

      Meteor.call('setDiscoverLocs', discoverLocs);      
    }  
    
    function openCreatePostModal(event) {
      var latLng = event.latLng;
      
      Session.set('mapClickedEvent', {locs : {lat : latLng.lat(), lng : latLng.lng()}});
      
      $('#createPostModal').modal('show');
    }  
    
    $('#sidebar').affix({
      offset: {
        top: $('header').height(),
        bottom: $('footer').height()
      }
    });      
    
    google.maps.event.addListener(map, "idle", setDiscoverLocs);     
    google.maps.event.addListener(map, "click", openCreatePostModal); 
  }
  //if(user) {
  //  google.maps.event.addListener(map, "idle", setDiscoverLocs);     
  //  google.maps.event.addListener(map, "click", openCreatePostModal);   
  //}
  
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

Template.gmap.destroyed = function() {
  google.maps.event.clearListeners(map, "idle");
  google.maps.event.clearListeners(map, "click");
  
  $(window).off('.affix');
  $("#sidebar")
      .removeClass("affix affix-top affix-bottom")
      .removeData("bs.affix");  
};

*/