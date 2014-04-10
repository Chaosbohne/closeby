/*
Why using throttle
http://ejohn.org/blog/learning-from-twitter/
*/


Template.posts.rendered = function() {
  function isBottomPosts() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 400 - $('footer').height()) {
      var path = $('a[href].load-more')[0];
      if(path) {
        Router.go('posts', {postsLimit : path.pathname});
      }
    }
  }
  
  function isTopPosts() {
    if($(window).scrollTop() < $('header').height()) {
      Router.go('posts');
    }
  }
  
  var throttledBottomPosts = _.throttle(isBottomPosts, 400, {trailing: false});
  var throttledTopPosts = _.throttle(isTopPosts, 300000, {leading: false});
  
  $(window).scroll(throttledBottomPosts);
  $(window).scroll(throttledTopPosts);  
}

Template.posts.destroyed = function() {
  $(window).unbind('scroll');  
};

Template.userposts.rendered = function() {
  function isBottomUserPosts() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 400 - $('footer').height()) {
      var path = $('a[href].load-more')[0];
      if(path) {
        var splittedPath = path.pathname.split('/', 4);   
        Router.go('userposts', {_id : splittedPath[2], postsLimit : splittedPath[3]});
      }
    }
  }
  
  function isTopUserPosts() {
    if($(window).scrollTop() < $('header').height()) {
      Router.go('userposts');
    }
  }
  
  var throttledBottomUserPosts = _.throttle(isBottomUserPosts, 400, {trailing: false});
  var throttledTopUserPosts = _.throttle(isTopUserPosts, 300000, {leading: false});
  
  
  $(window).scroll(throttledBottomUserPosts);
  $(window).scroll(throttledTopUserPosts);  
}

Template.userposts.destroyed = function() {
  $(window).unbind('scroll');  
};
