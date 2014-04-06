UserPostsListController = RouteController.extend({
  
  increment: 5,
  
  limit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  
  findOptions: function() {
    return {sort : {submitted : -1}, limit: this.limit()};
  },
  
  waitOn: function() {
    return Meteor.subscribe('postsByUser', this.params._id, this.findOptions());
  },
  
  posts: function() {
    return Posts.find({userId : this.params._id}, this.findOptions());
  },
  
  data: function() { 
    var hasMore = this.posts().count() === this.limit();
    var nextPath = this.route.path({_id : this.params._id, postsLimit: this.limit() + this.increment});

    return {
      posts : this.posts(),
      nextPath: hasMore ? nextPath : null
    };
  },
  
  onBeforeAction: function() {
    if (this.data()) {
      // we can then extract the userIds of the authors
      var imageIds = this.data().posts.map(function(p) { return p.imageId });
      imageIds = _.compact(imageIds);
      //console.log(imagIds);
      // and add the authors subscription to the route's waiting list as well
      this.subscribe('postImages', imageIds).wait();
    }      
  }  
});

Router.map(function() {
  this.route('userposts', {
    path: '/user/:_id/:postsLimit?',
    
    layoutTemplate: 'postLayout',
    
    controller: UserPostsListController
  });
});