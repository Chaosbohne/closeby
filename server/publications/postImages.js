Meteor.publish('allPostImages', function() {
  return PostImages.find();
});

Meteor.publish('postImages', function(imageIds) {
  console.log(imageIds);
  return PostImages.find({ _id : {$in: imageIds}})
});