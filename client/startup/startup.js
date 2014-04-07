Meteor.startup(function() {
  map = null;
  
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
  }  
});