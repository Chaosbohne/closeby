Template.post.helpers({
  showPostDetail: function() {
    return this._id === Session.get('showPostDetail');
  },
  fileObj: function() {
    var image = PostImages.findOne({_id : this.imageId});
    console.log(image);
    return image;
  }
});

Template.post.events({
  'mouseenter li' : function(event) {
   
    var latLng = new google.maps.LatLng(this.locs.lat, this.locs.lng);
    
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });    
        
    map.addMarker(marker);
    
  },
  
  'mouseleave li' : function(event){
    map.clearMarkers();
  },
  
  'click .postHead' : function(event) {
    console.log(this._id);
    Session.set('showPostDetail', this._id);
    
  }
});