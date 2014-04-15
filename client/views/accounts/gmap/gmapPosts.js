Template.gmapPosts.rendered = function() {
  
  var center, zoomLevel;
  var canvas = this.find('#map-canvas');  
  
  var user = Meteor.user();
  if(user) {  
    center = new google.maps.LatLng(user.profile.centerLocs.lat, user.profile.centerLocs.lng);
    zoomLevel = user.profile.zoomLevel;
  }

  map = new google.maps.Map(canvas, gmapOptions);   

  map.setZoom(zoomLevel);
  map.setCenter(center);
  
  
  if(user) {
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
};

Template.gmapPosts.destroyed = function() {
  google.maps.event.clearListeners(map, "idle");
  google.maps.event.clearListeners(map, "click");

  $(window).off('.affix');
  $("#sidebar")
  .removeClass("affix affix-top affix-bottom")
  .removeData("bs.affix");  
};