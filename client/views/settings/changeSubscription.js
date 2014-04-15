Template.changeSubscription.helpers({
  hasSubscriptionBoundChanged : function() {
    return Session.get('hasSubscriptionBoundChanged');
  }
});

Template.changeSubscription.rendered = function() {
  $("a[href='#subscription']").on('shown.bs.tab', function(){
    var sw, ne;
    
    var user = Meteor.user();
    if(user) {  
      sw = new google.maps.LatLng(user.profile.locs[0].lat, user.profile.locs[0].lng);
      ne = new google.maps.LatLng(user.profile.locs[1].lat, user.profile.locs[1].lng); 
    }

    var bounds = new google.maps.LatLngBounds(sw, ne);
    
    map = new google.maps.Map(document.getElementById("map-canvas"), gmapOptions);   
                          
    map.fitBounds(bounds);
    

    
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
      
    console.log(locs);
    
    Meteor.call('setLocs', locs, function(error, result) {
      if(!error)
        Session.set('hasSubscriptionBoundChanged', false);
    });         
  }
});