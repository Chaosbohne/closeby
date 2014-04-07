  
/*
  before:
    new post is inserted google maps latLng have to be inserted
    where the user clicked on map
    
  after:
    model is hidden
    
  onError:
    make a small console.log (should never occur)
  */

AutoForm.hooks({
  insertPostForm: {
    before: {
      'insertPost': function(doc) {

        var locs = Session.get('mapClickedEvent');
        if(!locs) return false;
        
        _.extend(doc, locs);
        
        var imageId = Session.get('selectedUploadImageId');
        if(imageId)
          _.extend(doc, {imageId : imageId});

        return doc;        
      }
    },
    
    after: {
      'insertPost': function() {
        $('#createPostModal').modal('hide');
        resetFileOptions();
      }
    },
    onError: function(operation, error, template) {
      console.log('ERROR');
      console.log(operation);
      console.log(error);
      //console.log(template);
    }        
  }
});