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

  user.profile = _.pick(tmpUser, 'name', 'locs');
  
  user.profile.discoverLocs = tmpUser.locs;
  
  return user;
});

Meteor.methods({
  setDiscoverLocs: function(discoverLocs) {
    check(discoverLocs, UpdateDiscoverLocsSchema);
    
    var user = Meteor.user();
    
    if(user)
      console.log(Meteor.users.update( {_id:Meteor.user()._id}, {$set: {"profile.discoverLocs" : discoverLocs.discoverLocs}}));
    
    return user;
  }
});

