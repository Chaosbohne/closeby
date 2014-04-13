Template.settings.rendered = function() {
 
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
     
  });  
}

Template.settings.destroyed = function() {
  $("a[href='#subscription']").off('shown.bs.tab');
}

// <a href="#subscription" 

Template.settings.helpers({
  email: function() {
    return this.emails[0].address;
  }
});