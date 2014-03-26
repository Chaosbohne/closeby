if(Posts.find().count() === 0) {
  /* Fixturing is with the new collection2 not working anymore */
  console.log('fixturing');
   
  
  /*
  var now = new Date().getTime();
  
  var tomId = Meteor.users.insert({
    profile: {name: 'Tom Coleman'}
  });
  
  var sachaId = Meteor.users.insert({
    profile: {name: 'Sacha Greif'}
  });
  
  var tom = Meteor.users.findOne(tomId);
  var sacha = Meteor.users.findOne(sachaId);
  
  var post1 = Posts.insert({
    content: "I am beautiful",
    userId: sacha._id,
    author: sacha.profile.name,
    locs: { lat : 51.049893, lng : 13.739251 },
    submitted: now - 7 * 3600 * 1000
  });
  
  var post2 = Posts.insert({
    content: "I am beautiful, too!",
    userId: sacha._id,
    author: sacha.profile.name,
    locs: { lat : 51.019893, lng : 13.739251 },
    submitted: now - 7 * 3600 * 1000
  });  
  
  var post3 = Posts.insert({
    content: "I am beautiful, too!I am beautiful, too!I am beautiful, too!I am beautiful, too!I am beautiful, too!I am beautiful, too!",
    userId: tom._id,
    author: tom.profile.name,
    locs: { lat : 51.019893, lng : 14.739251 },
    submitted: now - 7 * 3600 * 1000
  });   
  
  var post4 = Posts.insert({
    content: "I am beautiful, too!I am beautiful, too!I am beautiful, too!I am beautiful, too!I am beautiful, too!I am beautiful, too!I am beautiful, too!I am beautiful, too!I am beautiful, too!I am beautiful, too!I am beautiful, too!I am beautiful, too!",
    userId: tom._id,
    author: tom.profile.name,
    locs: { lat : 50.019893, lng : 14.739251 },
    submitted: now - 7 * 3600 * 1000
  }); */  
  
}