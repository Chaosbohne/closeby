var postImagesStore = new FS.Store.S3("postImages", {
  region: "eu-west-1", //required, or use endpoint option
  bucket: "closebypostimages", //required
  //ACL: myValue //optional, default is 'private'
  //beforeSave: myBeforeSaveFunction, //optional
  //maxTries: 1 //optional, default 5
  transformWrite: function(fileObj, readStream, writeStream) {
    this.gm(readStream, fileObj.name).strip().resize('1024').interlace("plane").blur('0.05').quality('80').stream().pipe(writeStream);
    
    /*
    if (typeof fileObj.name === "string") {
      console.log(fileObj.name.split(".")[0]);
      fileObj.name =  fileObj.name.split(".")[0] + ".jpeg";
      fileObj.type = "image/jpeg";
      
      //console.log(path.basename(fileObj.name, path.extname(fileObj.name)));
      //fileObj.name = path.basename(fileObj.name, path.extname(fileObj.name)) + ".jpeg";
      //fileObj.type = "image/jpeg";
    } 
    */
  }
});

var postImagesStoreFS = new FS.Store.FileSystem("thumbs", {
  path: "~/workspace/uploads/",
  beforeSave: function(writeStream) {
    var imageMagick = this.gm.subClass({ imageMagick: true });
    console.log(imageMagick(readStream, fileObj.name).resize(60).stream().pipe(writeStream));    
  }
});

PostImages = new FS.Collection('postImages', {
  stores: [postImagesStore],
  filter: {
    maxSize: 3145728,
    allow: {
      contentTypes: ['image/*'],
      extensions: ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG']
    }
  },
  onInvalid: function(message) {
    console.log(message);
  }
});


PostImages.allow({
  insert: function(userId, doc) {
    return (userId && doc.metadata.owner === userId);
  },
  update: function(userId, doc, fieldNames, modifier) {
    return (userId === doc.metadata.owner);
  },
  remove: function(userId, doc) {
    /* Remove image out of PostCollection */
    /* If Post is already published the image cannot be deleted! */
    
    /* Else if Post is not published but the user for example uploads the wrong image 
      it must be removable.
    */
    
    /*
    This is a lot of logic, so its outsorted in a Meteor.call
    */
    //return (userId === doc.metadata.owner);
    return false;
  },
  download: function(userId) {
    return !!userId;
  },
  fetch: []
});