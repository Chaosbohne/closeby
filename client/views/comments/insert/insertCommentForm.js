
/* var insertCommentForm  that is used for Autoform */
var insertCommentForm;

Template.insertCommentForm.created = function() {
    
  /* creating a new Autoform */
  insertCommentFormSchema = new AutoForm(CommentSchema);
  
  /*
  before:
    new post is inserted google maps latLng have to be inserted
    where the user clicked on map
    
  after:
    model is hidden
    
  onError:
    make a small console.log (should never occur)
  */
  
  var that = this;
  insertCommentFormSchema.hooks({
    before: {
      'insertComment': function(doc) {
        
        _.extend(doc, {postId : that.data._id});
        
        console.log(doc);
        
        return doc;        
      }
    },
    
    after: {
      'insertComment': function() {

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
Template.insertCommentForm.helpers({
  insertCommentFormSchema: function() {
    return insertCommentFormSchema;
  }
});