Template.navbar.rendered = function() {
  
  $('#nav-wrapper').affix({
    offset: {
      top: $('header').height()
    }    
  });
  
  //$('.dropdown-toggle').dropdown();
}