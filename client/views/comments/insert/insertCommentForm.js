

/* Push autoform to our html template */
Template.insertCommentForm.helpers({
  postId: function() {
    return this._id;
  },
  
  insertCommentFormSchema: function() {
    return CommentSchema;
  }
});