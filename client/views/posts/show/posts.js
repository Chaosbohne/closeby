

/*
Why using throttle
http://ejohn.org/blog/learning-from-twitter/

*/
Template.postsContent.rendered = function() {
  function isBottom() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 400 - $('footer').height()) {
      var path = $('a[href].load-more')[0];
      if(path) {
        Router.go('posts', {postsLimit : path.pathname});
      }
    }
  }
  
  function isTop() {
    if($(window).scrollTop() < $('header').height()) {
      Router.go('posts');
    }
  }
  
  var throttledBottom = _.throttle(isBottom, 400, {trailing: false});
  var throttledTop = _.throttle(isTop, 300000, {leading: false});
  
  $(window).scroll(throttledBottom);
  $(window).scroll(throttledTop);
};