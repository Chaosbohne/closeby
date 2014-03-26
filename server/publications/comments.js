
Meteor.publish('comments', function(postId) {
  return Comments.find({postId : postId});
});

Meteor.publish('allComments', function() {
  return Comments.find();
});

/*
*/