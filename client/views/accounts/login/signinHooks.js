AutoForm.hooks({
  signinForm: {
    onSubmit: function (insertDoc, updateDoc, currentDoc) {

      console.log('onsubmit');
      
      Meteor.loginWithPassword(insertDoc.email, insertDoc.password, function(error) {
        if(error) {
          console.log('login failed');
        }else {
          console.log('login succeed');
          Router.go('/');
        }
      });
      
      return false;    
    }
  }
});