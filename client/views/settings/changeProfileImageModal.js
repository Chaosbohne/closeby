Template.changeProfileImageModal.helpers({
  /* if true there are validation errors */
  hasImageValidationError: function() {
    return  Session.get('profileImageModalError');
  }  
});

Template.changeProfileImageModal.events({
  //Save cropped image
  'click .save': function(event) {
    event.preventDefault();
    
    //Get cropbox
    var crop = $('#imageToCrop').data('cropbox');  
    
    if(!crop) {
      var error = {hasError: true, reason: 'Failed to load image!'};
      Session.set('profileImageModalError', error);
      return;
    }
    
    //new fsFile
    var fsFile = new FS.File(crop.getBlob());
    //setMetadata, that is validated in collection
    //just own user can update/remove fsFile
    fsFile.metadata = {owner: Meteor.userId()};            
    
    
    //Insert post into collection
    ProfileImages.insert(fsFile, function (err, fileObj) {
      //Filter options failed -> error
      if(err) {
        var error = {hasError: true, reason: 'Failed to save image!'};
        Session.set('profileImageModalError', error);
        return;
      }
      
      //Save the imageId and Url to the userCollection just in case the upload was completed
      Deps.autorun(function (computation) {
        //Subscribe to the image that should be added
        //This causes Deps to rerun everytimes the handle changes
        var subscriptionHandle = Meteor.subscribe('profileImage', fileObj._id);
        
        //Get the image from subscription
        var profileImage = ProfileImages.findOne({_id : fileObj._id });
        
        //If there is an image
        if(profileImage) {
          //And the image already has an url
          //The image gets the url first when the upload is completed
          //reactive data source, so this reruns Deps
          if(profileImage.url({store : 'profileImages'})) {
            
            //Give the imageId to an updatefunction
            Meteor.call('setProfileImage', profileImage._id, function(error) {
              
              //Error, show a small message
              //Actually this should not happen
              if(error) {
                var error = {hasError: true, reason: 'Failed to save image!'};
                Session.set('profileImageModalError', error);
              }else {
                Session.set('profileImageModalError', null);
                $('#changeProfileImageModal').modal('hide');
              }
              
              //If the call was send whether there was an error or not
              //the computation and subscription should stop
              computation.stop();
              subscriptionHandle.stop();
              
            });      
          }
        }       
      });
    });      
  }
});

Template.changeProfileImageModal.destroyed = function() {
  var crop = $('#imageToCrop').data('cropbox');
  if(crop)
    crop.remove();
  $('input.slider').slider('destroy');
}