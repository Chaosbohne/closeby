Meteor.methods({
  insertComment: function(comment) {  
    Posts.update(comment.postId, {$inc: {commentsCount: 1}});
    
    return Comments.insert(comment);
  }
});
