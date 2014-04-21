Meteor.publish('allProfileImages', function() {
  return ProfileImages.find();
});

Meteor.publish('profileImage', function(imageId) {
  return ProfileImages.find({ _id : imageId });
});

Meteor.publish('profileImages', function(imageIds) {
  return ProfileImages.find({ _id : {$in: imageIds}})
});