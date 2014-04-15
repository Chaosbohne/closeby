Template.changeSubscription.helpers({
  hasSubscriptionBoundChanged : function() {
    return Session.get('hasSubscriptionBoundChanged');
  }
});

Template.changeSubscription.rendered = function() {
  $("a[href='#subscription']").on('shown.bs.tab', function(){
    
    var center, zoomLevel; 
    
    var user = Meteor.user();
    if(user) {  
      center = new google.maps.LatLng(user.profile.centerLocs.lat, user.profile.centerLocs.lng);
      zoomLevel = user.profile.zoomLevel;
    }
    
    map = new google.maps.Map(document.getElementById("map-canvas"), gmapOptions);   
    
    map.setZoom(zoomLevel);
    map.setCenter(center);
    
    
    function mapLoaded() {
      function newBounds() {
        Session.set('hasSubscriptionBoundChanged', true);
      }
      
      var onceNewBounds = _.once(newBounds);
      google.maps.event.addListener(map, "bounds_changed", onceNewBounds);       
    }
    
    var onceMapLoaded = _.once(mapLoaded);
    google.maps.event.addListener(map, 'idle', onceMapLoaded);    
  });  
}

Template.changeSubscription.destroyed = function() {
  google.maps.event.clearListeners(map, "idle");
  google.maps.event.clearListeners(map, "bounds_changed");  
  $("a[href='#subscription']").off('shown.bs.tab');
}


Template.changeSubscription.events({
  'click button': function(event) {
    var sw = map.getBounds().getSouthWest();
    var ne = map.getBounds().getNorthEast();
    
    var locs = {'locs': [
      {lng : sw.lng(), lat : sw.lat()},
      {lng : ne.lng(), lat : ne.lat()}
    ]};    
    
    
    var centerLocs = {'centerLocs': { lng: map.getCenter().lng(),  lat : map.getCenter().lat() }};
    
    var zoomLevel = {'zoomLevel' : map.getZoom()};
    
    _.extend(locs, centerLocs, zoomLevel);
    
    Meteor.call('setMapData', locs, function(error, result) {
      if(!error)
        Session.set('hasSubscriptionBoundChanged', false);
      else 
        console.log(error);
    });         
  }
});