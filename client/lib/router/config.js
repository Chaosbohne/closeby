Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.onBeforeAction(beforeHooks.isLoggedIn, {except: ['landingPage']});
//Router.before(beforeHooks.isLoggedIn, {only: ['posts']});

Router.map(function() {
  this.route('landingPage', {
    path: '/login'
  });
});

Router.map(function() {
  this.route('posts', {
    path: '/',
    
    layoutTemplate: 'postLayout',
    
    waitOn: function() {
      var user = Meteor.user();
      if(user) {     
        if(this.isFirstRun)
          return [Meteor.subscribe('posts', user.profile.locs[0].lat, user.profile.locs[0].lng, user.profile.locs[1].lat, user.profile.locs[1].lng)];
        else
          return [Meteor.subscribe('posts', user.profile.discoverLocs[0].lat, user.profile.discoverLocs[0].lng, user.profile.discoverLocs[1].lat, user.profile.discoverLocs[1].lng)];
      }
    },
    
    data: function() { 
      return {posts : Posts.find({},{sort : {submitted : -1}})};
    },
    
    onBeforeAction: function() {
      if (this.data()) {
        // we can then extract the userIds of the authors
        var imageIds = this.data().posts.map(function(p) { return p.imageId });
        console.log(imageIds);
        imageIds = _.compact(imageIds);
        //console.log(imagIds);
        // and add the authors subscription to the route's waiting list as well
        this.subscribe('postImages', imageIds).wait();
      }      
    }
  });
});


Router.map(function() {
  this.route('posts', {
    path: '/user/:_id',
    
    layoutTemplate: 'postLayout',
    
    waitOn: function() {
      return Meteor.subscribe('postsByUser', this.params._id);      
    },
    
    data: function() {
      return { posts : Posts.find({userId : this.params._id},{sort : {submitted : -1}})};
    }    
  });
});

Router.map(function() {
  this.route('edit', {
    path: '/edit/:_id',
    
    layoutTemplate: 'postLayout',
    
    waitOn: function() {
      return Meteor.subscribe('profileimages');      
    }
  });
});
