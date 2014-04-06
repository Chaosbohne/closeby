Meteor.methods({
  deleteImagePost: function(imagePostId) {  
    var user = Meteor.user();
    if(user) {
      var post = Posts.findOne({imageId : imagePostId});
      if(!post) {
        PostImages.remove(imagePostId);
        return true;
      }
      return false;
    }
    return false;
  }
});
