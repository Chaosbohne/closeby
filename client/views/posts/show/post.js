Template.post.helpers({
  showPostDetail: function() {
    return this._id === Session.get('showPostDetail');
  },
  fileObj: function() {
    var image = PostImages.findOne({_id : this.imageId});
    return image;
  },
  userObject: function() {
    return {
      _id : this.userId,
      author : this.author
    }
  }
});

Template.post.events({
  'mouseenter .post' : function(event) {

    var latLng = new google.maps.LatLng(this.locs.lat, this.locs.lng);
    
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });    
        
    map.addMarker(marker);
    
  },
  
  'mouseleave .post' : function(event){
    map.clearMarkers();
  },
  
  'click .postHead' : function(event) {
    Session.set('showPostDetail', this._id);
  }
});