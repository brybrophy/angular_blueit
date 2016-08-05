'use strict';

app.directive('bbPostsNav', function() {
  return {
    templateUrl: 'components/posts-nav.html'
  };
});

app.directive('bbPostsForm', function() {
  return {
    templateUrl: 'components/posts-form.html'
  };
});

app.directive('bbPostsLarge', function() {
  return {
    templateUrl: 'components/posts-large.html'
  };
});
