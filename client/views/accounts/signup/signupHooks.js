AutoForm.hooks({
  signupForm: {
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
    
      var sw = map.getBounds().getSouthWest();
      var ne = map.getBounds().getNorthEast();
      
      var locs = {'locs': [
        {lng : sw.lng(), lat : sw.lat()},
        {lng : ne.lng(), lat : ne.lat()}
      ]};
      
      _.extend(insertDoc, locs);
      
      Accounts.createUser(insertDoc, function(error){
        console.log(insertDoc);
        if(error) {
          console.log(error);
          console.log('register failed');
        }else {
          Router.go('/');
        }
      });
      
      return false;
    }    
  }
});