Create a pre middleware
userSchema.pre( ‘save’ , function(next){
  next();
});

- Create a post middleware
userSchema.post(‘save’, function(doc, next){
  next();
});