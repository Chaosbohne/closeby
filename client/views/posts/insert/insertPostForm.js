
/* var insertPostForm  that is used for Autoform */
var insertPostForm;

Template.insertPostForm.created = function() {
  
  /* creating a new Autoform */
  insertPostFormSchema = new AutoForm(PostSchema);
  
  /*
  before:
    new post is inserted google maps latLng have to be inserted
    where the user clicked on map
    
  after:
    model is hidden
    
  onError:
    make a small console.log (should never occur)
  */
  insertPostFormSchema.hooks({
    before: {
      insert: function(doc) {
        var locs = Session.get('mapClickedEvent');
        if(!locs) return false;
        
        _.extend(doc, locs);
        return doc;        
      },
      'insertPost': function(doc) {
        var locs = Session.get('mapClickedEvent');
        if(!locs) return false;
        
        _.extend(doc, locs);
        return doc;        
      }
    },
    
    after: {
      'insertPost': function() {
         $('#createPostModal').modal('hide');
      }
    },
    onError: function(operation, error, template) {
      console.log('ERROR');
      console.log(operation);
      console.log(error);
      console.log(template);
    }    
    
  });    
}

/* Push autoform to our html template */
Template.insertPostForm.helpers({
  insertPostFormSchema: function() {
    return insertPostFormSchema;
  }
});