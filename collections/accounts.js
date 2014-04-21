
//Has to be tested
Meteor.users.deny({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});