Template.userprofile.helpers({
  name: function() {
    return Meteor.user().profile.name;
  }
});