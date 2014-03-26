beforeHooks =  {
  isLoggedIn: function() {
    if(!(Meteor.loggingIn() || Meteor.user())) {
      Router.go('landingPage');
      this.stop();
    }
  }
}