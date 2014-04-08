

/*
Sometimes it is still a bit buggy,
but i can live with that for now.
Because clickable button always shows correct results
just the autopreload sometimes fail

Why using throttle
http://ejohn.org/blog/learning-from-twitter/

*/
Template.postsContent.rendered = function() {
  var that = this;
  function isBottom() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 400 - $('footer').height()) {
      if(that.data.nextPath)
        Router.go('posts', {postsLimit : that.data.nextPath});
    }
  }
  
  
  function isTop() {
    if($(window).scrollTop() < $('header').height()) {
      Router.go('posts');
    }
  }
  
  var throttledBottom = _.throttle(isBottom, 400);
  var throttledTop = _.throttle(isTop, 300000, {leading: false});
  
  $(window).scroll(throttledBottom);
  $(window).scroll(throttledTop);
};