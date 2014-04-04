Meteor.methods({
  deleteImagePost: function(imagePostId) {  
    var user = Meteor.user();
    console.log('in deleteImagePost');
    console.log(imagePostId);
    if(user) {
      var post = Posts.findOne({imageId : imagePostId});
      console.log('post');
      console.log(post);
      
      if(!post) {
        console.log('no post found');
        var postImage = PostImages.findOne({_id : imagePostId});
        console.log(postImage);
        id = PostImages.remove({_id : imagePostId});
        console.log(id);
        return true;
      }
      
      return false;
    }
    return false;
  }
});
