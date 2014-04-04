Template.insertPost.events({ 
  // Show some visual dragn drop hints
  'dragenter #createPostModal': function(event, template) {
    console.log('dragenter');
  },
  // Release these visual dragn drop hints
  'dragleave #createPostModal': function(event, template) {
    console.log('dragleave');
  }
});