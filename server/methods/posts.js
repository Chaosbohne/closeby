Meteor.methods({
  insertPost: function(post) {  
    return Posts.insert(post);
  }
});
