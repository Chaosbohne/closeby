Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.onBeforeAction(beforeHooks.isLoggedIn, {except: ['landingPage']});
Router.onBeforeAction(beforeHooks.resetPostsLimit, {only: ['posts']});
//Router.before(beforeHooks.isLoggedIn, {only: ['posts']});

Router.map(function() {
  this.route('landingPage', {
    path: '/login'
  });
});