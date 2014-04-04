/*var signinForm;
Template.signinForm.created = function() {
  signinForm = new AutoForm(SigninSchema);
  

  signinForm.hooks({
    onSubmit: function (insertDoc, updateDoc, currentDoc) {

      console.log(insertDoc);
      
      Meteor.loginWithPassword(insertDoc.email, insertDoc.password, function(error) {
        if(error) {
          console.log('login failed');
        }else {
          Router.go('posts');
        }
      });
      
      return false;
    }
  });                   
  
};

*/
Template.signinForm.helpers({
  signinForm: function() {
    return SigninSchema;
  }
});
