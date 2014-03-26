Meteor.publish('posts', function(bottom_left_x
                               , bottom_left_y
                               , upper_right_x
                               , upper_right_y) {

  return Posts.find({locs: {$geoWithin: {$box:
                                      [[bottom_left_x, bottom_left_y],
                                       [upper_right_x, upper_right_y]]}}});  
});

Meteor.publish('postsByUser', function(userId) {
  return Posts.find({userId: userId});
});

Meteor.publish('allPosts', function() {
  return Posts.find();
});

/*
*/