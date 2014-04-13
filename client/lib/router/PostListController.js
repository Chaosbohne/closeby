PostsListController = RouteController.extend({
    
  increment: 10,
  
  limit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  
  findOptions: function() {
    return {sort : {submitted : -1}, limit: this.limit()};
  },
  
  waitOn: function() {
    var user = Meteor.user();
    
    if(user) {     
      if(this.isFirstRun) {
        return [Meteor.subscribe('posts', user.profile.locs[0].lat, user.profile.locs[0].lng, user.profile.locs[1].lat, user.profile.locs[1].lng, this.findOptions()),
               Meteor.subscribe('allPostImages')];
      }else{
        return [Meteor.subscribe('posts', user.profile.discoverLocs[0].lat, user.profile.discoverLocs[0].lng, user.profile.discoverLocs[1].lat, user.profile.discoverLocs[1].lng, this.findOptions()),
               Meteor.subscribe('allPostImages')];
      }
    }
  },
  
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  
  data: function() { 
    var hasMore = this.posts().count() === this.limit();
    var nextPath = this.route.path({postsLimit: this.limit() + this.increment});
    
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

