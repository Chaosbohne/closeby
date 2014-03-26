/* 
GeocoordsSchema 

Provides a schema for geospatial coordinates.
These consists of latitude and longitude.
Latitude ranges between -90 and 90 degrees.
Longitude ranges between -180 and 180 degrees.
*/
GeocoordsSchema = new SimpleSchema({
  lat: {
    type : Number,
    decimal: true,
    min: -90,
    max: 90
  },
  lng: {
    type : Number,
    decimal: true,
    min: -180,
    max: 180
  } 
});

/* 
NameSchema 

Provides a schema for names.
*/
NameSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Your name",
    max: 50,
    min: 3
  }  
});


/* 
EmailSchema 

Provides a schema for Email.
*/
EmailSchema = new SimpleSchema({
  email: {
    type: String,
    label: "Your E-Mail",
    regEx: SchemaRegEx.Email
  }  
});


PasswordSchema = new SimpleSchema({
  password: {
    type: String,
    label: "Your password",
    min: 5,
    max: 40
  }
});


UpdateDiscoverLocsSchema = new SimpleSchema({
  discoverLocs: {
    type: [GeocoordsSchema]
  }  
});

/* 
SignupServerSchema 

Provides a schema for accountvalidation on server-side.
Server-side validation differs from client-side-validation.
Server-side has to control all fields including geospatial,
which are provided by gmaps. Password is hashed and salted
from meteor itself. No validation needed.
*/
SignupServerSchema = new SimpleSchema([
  NameSchema,
  EmailSchema,
  {
    locs: {
      type: [GeocoordsSchema]
    }
  }
]);


/* 
SignupClientSchema 

Provides a schema for accountvalidation on client-side.
client-side validation differs from Server-side-validation.
Client-side just controls direct user-input-fields. No 
geospatialvalidation needed because it is provided from gmaps,
which can be seen as trusted input. Despite it is handled serverside.
*/
SignupClientSchema = new SimpleSchema([
  NameSchema,
  EmailSchema,
  PasswordSchema
]);


SigninSchema = new SimpleSchema([
  PasswordSchema,
  EmailSchema
]);

