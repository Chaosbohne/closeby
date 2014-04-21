/*
onCreateUser

New users have to be validated.
Creating tmpUser which omits passwordfields,
because they are already hashed and salted by meteor and
dont need further investigation. 

The rest is checked against SignupServerSchema.
The name and the geospatial location should be public
and is provided in profile.
*/
Accounts.onCreateUser(function(options, user) {

  var tmpUser = _.omit(options, 'srp', 'generateLoginToken');

  check(tmpUser, SignupServerSchema);

  user.profile = _.pick(tmpUser, 'name', 'locs', 'centerLocs', 'zoomLevel');
  
  user.profile.discoverLocs = tmpUser.locs;
  user.profile.centerLocs = tmpUser.centerLocs;
  user.profile.zoomLevel = tmpUser.zoomLevel;
  
  return user;
});

Meteor.methods({
  setDiscoverLocs: function(discoverLocs) {
    
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to do any changes");        
    
    check(discoverLocs, UpdateDiscoverLocsSchema);
    
    Meteor.users.update( {_id: user._id}, {$set: {"profile.discoverLocs" : discoverLocs.discoverLocs}});
    
    return user;
  },
  
  setMapData: function(mapData) {
    
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to do any changes");    
    
    check(mapData, MapDataSchema);
    
    Meteor.users.update( {_id: user._id},
                        {$set: 
                         {
                           "profile.locs" : mapData.locs,
                           "profile.centerLocs": mapData.centerLocs,
                           "profile.zoomLevel": mapData.zoomLevel
                         }
                        });
    
    return user;    
  },
  
  setProfileImage: function(imageId, imageUrl) {
    
    var user = Meteor.user();
    var image = ProfileImages.findOne({ _id : imageId });
    
    if (!user)
      throw new Meteor.Error(401, "You need to login to do any changes");    
    
    if(!image)
      throw new Meteor.Error(401, "ImageId does not exist");    
    
    Meteor.users.update( { _id : user._id}, 
                        {$set:
                         {
                           "profile.imageId" : image._id,
                           "profile.imageUrl" : image.url({store: 'profileImages', auth: false})
                         }
                        });
                       
    return user;
  }
});

