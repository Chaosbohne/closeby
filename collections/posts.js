
/*

Posts-Collection used with Collection2

PostSchema is defined in schema posts.
Autovalidation granted.
*/
Posts = new Meteor.Collection('posts', {
  schema : PostSchema
});