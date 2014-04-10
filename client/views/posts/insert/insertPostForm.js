/* Push autoform to our html template */
Template.insertPostForm.helpers({
  
  /* if post has an image return true, else false */
  hasPostImage: function() {
    return Session.get('selectedUploadImageId');
  },
  
  /* returning schema for collection2 */
  insertPostFormSchema: function() {
    return PostSchema;
  },
  
  /* if true there are validation errors */
  hasImageValidationError: function() {
    return Session.get('hasImageValidationError');
  }
  
});

/*
Preview, upload and add image to post.
*/

function addImage(event) {
  // Grap files
  // Attention, just one file is allowed per post!
  var files = event.target.files;
 
  //Go throw each file, but return after first file is parsed
  FS.Utility.eachFile(event, function(file) {
    
    //new fsFile
    var fsFile = new FS.File(file);
    //setMetadata, that is validated in collection
    //just own user can update/remove fsFile
    fsFile.metadata = {owner: Meteor.userId()};
    
    //Insert post into collection
    PostImages.insert(fsFile, function (err, fileObj) {
      //Filter options failed -> error
      if(err) {
        Session.set('hasImageValidationError', true);
        return;
      }
      
      //Filter options passed -> generate preview image
      var reader = new FileReader();
      
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<button class="delete-thumbnail close">&times;</button><img class="thumb img-responsive" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');         
          document.getElementById('thumbnail-preview-wrap').insertBefore(span, null);       
        };
      })(file);
      
      // Read in the image file as a data URL.
      reader.readAsDataURL(file);        
      // Set imageId
      Session.set('selectedUploadImageId', fileObj._id); 
    });   
    
    // Return after first file, because just one file per post allowed.
    return;
  });  
}

function removeImage(event) {
  event.preventDefault();    
  
  if(Session.get('selectedUploadImageId')) {
    var fileObj = PostImages.findOne({_id : Session.get('selectedUploadImageId')});

    FS.HTTP.uploadQueue.pause();
    
    if(FS.HTTP.uploadQueue.isUploadingFile(fileObj)){
      FS.HTTP.uploadQueue.cancel(fileObj);
      resetFileOptions();
    }else {
      FS.HTTP.uploadQueue.cancel(fileObj);
      Meteor.call('deleteImagePost', Session.get('selectedUploadImageId'), function(error, isDeleted) {
        if(isDeleted){
          resetFileOptions();
        }else {
          console.log('isnotDeleted');
        }
      });
    }
  }
}

Template.insertPostForm.events({  
  /*
  If image is dropped in dropzone, add image to post.
  */
  'dropped #dropzone': function(event, template) {
    addImage(event);
  },

  /*
  If image is inserted via button, add image to post.
  */  
  'change #addImage': function(event, template) {
    addImage(event);
  },

  /*
  If image is deleted, delete image from database.
  */
  'click #removeImage': function(event, template) {
    removeImage(event);
  },
  
  /*
  If image is deleted, delete image from database.
  */  
  'click .delete-thumbnail': function(event, template) {
    removeImage(event);
  }
});