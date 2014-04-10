Template.navbar.rendered = function() {
  $('#nav-wrapper').affix({
    offset: {
      top: $('header').height()
    }    
  });
}

Template.navbar.events({
  'click .settings': function() {
    Router.go('settings');
  },
  
  'click .logout': function() {
    Meteor.logout();
  }
});