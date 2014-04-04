Meteor.publish("profileimages", function() {
  return ProfileImages.find();
});