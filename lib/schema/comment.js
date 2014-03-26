/*
CommentsSchema 

Provides a schema for comments.
This schema is used with collection2.
A comment has following fields:
 - userId : autoset with loggedIn UserId
 - author : autoset with loggedIn UserName
 - submitted : autoset with servertime
 - content : given from user as input
*/

CommentSchema = new SimpleSchema({ 
  userId: {
    type: String,
    autoValue: function() {
      if(this.isInsert) {
        if(Meteor.user())
          return Meteor.user()._id;
        else
          this.unset();
      }
      
      /* ClientValidation */
      if(!this.isInsert && !this.isUpdate && !this.isUpsert) {
        if(Meteor.user())
          return Meteor.user()._id;
        else
          this.unset();        
      }
    },
    denyUpdate: true
  },
  postId: {
    type: String,
    autoValue: function() {
      if(this.isSet) {
        if(this.isInsert) {
          var post = Posts.findOne(this.value);
          if(!post)
            this.unset();
        }        
      }else {
        this.unset();
      }
      
      /* ClientValidation */
      if(!this.isInsert && !this.isUpdate && !this.isUpsert) {      
        var post = Posts.findOne(this.value);
        if(!post)
          this.unset();        
      }
    },
    denyUpdate: true    
  },
  author: {
    type: String,
    autoValue: function() {
      if(this.isInsert) {
        if(Meteor.user())
          return Meteor.user().profile.name;
        else
          this.unset();
      }
      
      /* ClientValidation */
      if(!this.isInsert && !this.isUpdate && !this.isUpsert) {  
        if(Meteor.user())
          return Meteor.user().profile.name;
        else
          this.unset();        
      }
    },
    denyUpdate: true
  },
  submitted: {
    type: Number,
    autoValue: function() {
      if(this.isInsert) {
        return new Date().getTime();
      }else {
        this.unset();
      }
      
      /* ClientValidation */
      if(!this.isInsert && !this.isUpdate && !this.isUpsert) {  
        return new Date().getTime();    
      }      
    },
    denyUpdate: true
  },
  content: {
    type: String,
    label: 'Your Comment',
    min: 3,
    max: 1000
  }
});