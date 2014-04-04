Template.edit.events({
  'change .myFileInput': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      ProfileImages.insert(file, function (err, fileObj) {
        //If !err, we have inserted new doc with ID fileObj._id, and
        //kicked off the data upload using HTTP
        console.log(err);
        console.log(fileObj);
      });
    });
  } 
});


Template.edit.images = function() {
  return ProfileImages.find();
}

Template.edit.imagesCollection = function () {
  return ProfileImages;
};