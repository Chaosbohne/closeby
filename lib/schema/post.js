/*
PostSchema 

Provides a schema for posts.
This schema is used with collection2.
A post has following fields:
 - userId : autoset with loggedIn UserId
 - author : autoset with loggedIn UserName
 - submitted : autoset with servertime
 - locs : given from map
 - content : given from user as input
*/

PostSchema = new SimpleSchema({ 
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
      }
      
      /* ClientValidation */
      if(!this.isInsert && !this.isUpdate && !this.isUpsert) {
        return new Date().getTime();
      }      
    },
    denyUpdate: true
  },
  locs: {
    type: GeocoordsSchema,
    denyUpdate: true
  },
  content: {
    type: String,
    label: 'Your Post',
    min: 3,
    max: 1000,
    autoValue: function() {
      if(this.isSet){
        text = Spacebars.SafeString(this.value);

        var urlRegex =/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;  
        text = text.toString().replace(urlRegex, function(url) {  
          return '<a target="_blank" href="' + url + '">' + url + '</a>';  
        });

        return text;
      }
    }
    
  },
  commentsCount: {
    type: Number,
    autoValue: function() {
      if(this.isInsert) {
        return 0;
      }    
      
      /* ClientValidation */
      if(!this.isInsert && !this.isUpdate && !this.isUpsert) {
        return 0;
      }
    }
  },
  imageId: {
    type: String,   
    optional: true,
    autoValue: function() {
      if(this.isInsert) {
        if(this.isSet) {
          var image = PostImages.find({_id : this.value});
          if(image)
            return image._id;
          else
            this.unset();
        }
      }

      
      if(!this.isInsert && !this.isUpdate && !this.isUpsert) {
        if(this.isSet) {
          var image = PostImages.find({_id : this.value});
          if(image)
            return image._id;
          else
            this.unset();
        }
      }      
    }
  }
});