Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.onBeforeAction(beforeHooks.isLoggedIn, {except: ['landingPage']});
//Router.onBeforeAction(beforeHooks.resetPostsLimit, {only: ['posts', 'userposts']});

Router.map(function() {
  this.route('landingPage', {
    path: '/login',
    
    controller: LandingPageController
  });
});

Router.map(function() {
  this.route('settings', {
    path: '/settings',
    
    layoutTemplate: 'noPostLayout'
  });
});

Router.map(function() {
  this.route('userposts', {
    path: '/user/:_id/:postsLimit?',
    
    layoutTemplate: 'postLayout',
    
    controller: UserPostsListController,
    
    yieldTemplates: {
      'gmapPosts': {to: 'gmapPosts'}
    }      
  });
});

Router.map(function() {
  this.route('posts', {
    path: '/:postsLimit?',
    
    layoutTemplate: 'postLayout',
    
    controller: PostsListController,
    
    yieldTemplates: {
      'gmapPosts': {to: 'gmapPosts'}
    }    
  });
});