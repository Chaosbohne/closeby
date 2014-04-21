/* Push autoform to our html template */
Template.changeProfileImage.helpers({
  /* if true there are validation errors */
  hasImageValidationError: function() {
    return  Session.get('profileImageError');
  }
});


function addImage(event) {
  //Go throw each file, but return after first file is parsed
  FS.Utility.eachFile(event, function(file) {    
    
    //Some typechecks
    //TAKE CARE: These checks have to be same as in collection!
    if(file.size > 3145728) {
      var error = {hasError: true, reason: 'Please choose an image smaller than 3MB!'};
      Session.set('profileImageError', error);
      return false;
    }

    //check filetype
    if(!file.type.match('image/*')) {
      var error = {hasError: true, reason: 'Please choose an image!'};
      Session.set('profileImageError', error);
      return false;        
    }
    
    function hasExtension(fileName, exts) {
      return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
    }      
    
    //check extensions
    if (!hasExtension(file.name, ['.jpg', '.png', '.JPG', '.PNG'])) {
      var error = {hasError: true, reason: 'Just jpg and png are allowed!'};
      Session.set('profileImageError', error);
      return false;        
    }      
    
    //Filter options passed -> generate preview image
    var reader = new FileReader();
    
    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        
        //Set image to croping area
        var imageToCrop = document.getElementById('imageToCrop');
        imageToCrop.src = e.target.result;
        imageToCrop.title = escape(theFile.name);          
        
        //If image was loaded
        imageToCrop.onload = function() {
          
          // Source
          // https://github.com/acornejo/jquery-cropbox
          var cropBox = $('#imageToCrop').cropbox({
            width: 200,
            height: 200,
            maxZoom: 1.0,
            zoom: 0.1,
            controls: null,
            showControls: 'never'
          });
          
          // Source
          // https://github.com/seiyria/bootstrap-slider
          $('input.slider').slider({
            id: 'zoomSlider',
            min: 0,
            max: 100,
            step: 1,
            orientation: 'horizontal',
            value: 10,
            tooltip: 'hide',
            selection: 'before',
            handle: 'round'
          })
          .on('slide', function(event) {
            var zoomValue = event.value / 100;
            if(zoomValue) {
              var crop = $('#imageToCrop').data('cropbox');
              if(crop) {
                crop.zoom(zoomValue);
                crop.update();
              }
            }
          });
          
    
          Session.set('profileImageError', null);          
          
          //Show modal
          $('#changeProfileImageModal').modal('show');
        }
      };
    })(file);
    
    // Read in the image file as a data URL.
    reader.readAsDataURL(file);          

    return;
  }); 
}


Template.changeProfileImage.destroyed = function() {
  Session.set('profileImageError', null);
}

Template.changeProfileImage.events({  
  /*
  If image is dropped in dropzone, add image to post.
  */
  'dropped #dropzone': function(event, template) {
    addImage(event);
  },

  /*
  If image is inserted via button, add image to post.
  */  
  'change #addImage': function(event, template) {
    addImage(event);
  }
});