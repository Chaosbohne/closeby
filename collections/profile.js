/*

IMPORTANT !!!!!!!!
The imageStoreConfiguration should be implemented via
serversessionvariables ! This code is publice in client!!
THIS IS DANGEROUS!

*/

var imageStore = new FS.Store.S3("images", {
  region: "eu-west-1", //required, or use endpoint option
  //accessKeyId: xxx //required if environment variables are not set
  //secretAccessKey: xxx //required if environment variables are not set
  bucket: "closebyprofilepictures", //required

  //ACL: 'private', //optional, default is 'private'
  transformWrite: function(fileObj, readStream, writeStream) {
    console.log('TRANSFORMWRITE');
    //this.gm(readStream, fileObj.name).resize('10', '10').stream().pipe(writeStream);
    //this.gm({ imageMagick: true }).resize(60).save({stream: writeStream});
    var imageMagick = this.gm.subClass({ imageMagick: true });
    console.log(imageMagick(readStream, fileObj.name).resize(200).stream().pipe(writeStream));
    //readStream.pipe(writeStream);
  } 
  //maxTries: 1 //optional, default 5  
});

ProfileImages = new FS.Collection("profileimages", {
  stores: [imageStore]
});
/*
ProfileImages = new FS.Collection("profileimages", {
  stores: [new FS.Store.FileSystem("profileimages", {path: "~/workspace/uploads"})]
});*/

ProfileImages.allow({
  insert: function(userId) {
    return !!userId;
  },
  update: function(userId) {
    return !!userId;
  },
  remove: function(userId) {
    return !!userId;
  },
  download: function(userId) {
    return true;
  },
  fetch: []
});