Meteor.publish('posts', function(bottom_left_x
                               , bottom_left_y
                               , upper_right_x
                               , upper_right_y
                               , sort
                               , limit) {
  
  return Posts.find({locs: {$geoWithin: {$box:
                                      [[bottom_left_x, bottom_left_y],
                                       [upper_right_x, upper_right_y]]}}}, {sort: sort, limit: limit});  
});

Meteor.publish('postsByUser', function(userId, sort, limit) {
  return Posts.find({userId: userId}, {sort: sort, limit: limit});
});

Meteor.publish('allPosts', function() {
  return Posts.find();
});

/*
*/