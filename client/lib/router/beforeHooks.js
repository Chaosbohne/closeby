beforeHooks =  {
  isLoggedIn: function() {
    if(!(Meteor.loggingIn() || Meteor.user())) {
      Router.go('landingPage');
      this.stop();
    }
  },
  
  resetPostsLimit: function() {
    console.log(this);
    
    if(this.isFirstRun) {
      console.log('FIRSTRUN');
    }
    console.log('NO FIRSTRUN');
  }
}