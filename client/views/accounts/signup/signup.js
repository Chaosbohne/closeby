var signupForm;
Template.signupForm.created = function() {
  signupForm = new AutoForm(SignupClientSchema);
  
  /*
  Adding hook, because we want to call a meteor-method and
  we need to add extra fields into the userobject. 
  */
  signupForm.hooks({
    onSubmit: function (insertDoc, updateDoc, currentDoc) {

      var sw = map.getBounds().getSouthWest();
      var ne = map.getBounds().getNorthEast();
      
      var locs = {'locs': [
        {lng : sw.lng(), lat : sw.lat()},
        {lng : ne.lng(), lat : ne.lat()}
      ]};

      _.extend(insertDoc, locs);
     
      Accounts.createUser(insertDoc, function(error){
        if(error) {
          console.log('register failed');
        }else {
          Router.go('posts');
        }
      });
      
      return false;
    }
  });                   
  
};


Template.signupForm.helpers({
  signupForm: function() {
    return signupForm;
  }
});
