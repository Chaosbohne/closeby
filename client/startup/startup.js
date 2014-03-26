Meteor.startup(function() {
  map = null;
  
  Session.set('mapClickedEvent', null); 
  
  Session.set('showPostDetail', null);
  Deps.autorun(function () {
    var postId = Session.get('showPostDetail');
    if(postId)
      Meteor.subscribe("comments", postId);
  });  
  
  
});