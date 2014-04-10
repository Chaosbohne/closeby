Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.onBeforeAction(beforeHooks.isLoggedIn, {except: ['landingPage']});
//Router.onBeforeAction(beforeHooks.resetPostsLimit, {only: ['posts', 'userposts']});

Router.map(function() {
  this.route('landingPage', {
    path: '/login'
  });
});

Router.map(function() {
  this.route('settings', {
    path: '/settings',
    
    layoutTemplate: 'postLayout'
  });
});

Router.map(function() {
  this.route('userposts', {
    path: '/:_id/:postsLimit?',
    
    layoutTemplate: 'postLayout',
    
    controller: UserPostsListController
  });
});

Router.map(function() {
  this.route('posts', {
    path: '/:postsLimit?',
    
    layoutTemplate: 'postLayout',
    
    controller: PostsListController
  });
});