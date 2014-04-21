Template.userprofile.helpers({
  name: function() {
    return Meteor.user().profile.name;
  },
  imageUrl: function() {
    return Meteor.user().profile.imageUrl;
  }
});