Meteor.startup(function() {
  
  Session.set('mapClickedEvent', null); 
  
  Session.set('showPostDetail', null);
  Deps.autorun(function () {
    var postId = Session.get('showPostDetail');
    if(postId)
      Meteor.subscribe("comments", postId);
  });  
  
  
  /* Session variables for posting */
  Session.set('selectedUploadImageId', null);
  Session.set('hasImageValidationError', false);
  
  resetFileOptions = function () {
    $('#thumbnail-preview-wrap').html('');
    Session.set('selectedUploadImageId', null);   
    Session.set('hasImageValidationError', false);    
  }  
  
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
  
  var gmapStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];  
  
  gmapOptions = {
    zoom: 8,
    panControl: false,
    zoomControl: false,
    scaleControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    overviewMapControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: gmapStyles
  };
  
  
});