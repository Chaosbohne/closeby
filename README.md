<template name="signup">
  <div class="signup-form">
    <form role="form">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Fullname">
      </div>                
      <div class="form-group">
        <input type="email" class="form-control" placeholder="E-Mail">
      </div>                      
      <div class="form-group">
        <input type="password" class="form-control" placeholder="Password">
      </div>
      <div class="form-group">
        {{> gmap}}    
      </div>         
      <div class="form-group">
        <button type="submit" class="btn btn-block btn-info">Sign Up</button>
      </div>
    </form>
  </div>               
</template>