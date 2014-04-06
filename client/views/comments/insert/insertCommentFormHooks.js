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
  insertCommentForm: {
    before: {
      'insertComment': function(doc) {        
        return doc;    
      }
    },
    
    after: {
      'insertPost': function() {
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