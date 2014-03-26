Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.before(beforeHooks.isLoggedIn, {except: ['landingPage']});
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
          return Meteor.subscribe('posts', user.profile.locs[0].lat, user.profile.locs[0].lng, user.profile.locs[1].lat, user.profile.locs[1].lng);
        else
          return Meteor.subscribe('posts', user.profile.discoverLocs[0].lat, user.profile.discoverLocs[0].lng, user.profile.discoverLocs[1].lat, user.profile.discoverLocs[1].lng);
      }
    },
    
    data: function() { 
      return { posts : Posts.find({},{sort : {submitted : -1}})};
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