'use strict';

app.directive('bbPostsNav', function() {
  return {
    templateUrl: 'components/posts-nav.html'
  };
});

app.directive('bbPostsNavSmall', function() {
  return {
    templateUrl: 'components/posts-nav-small.html'
  };
});

app.directive('bbPostsForm', function() {
  return {
    templateUrl: 'components/posts-form.html'
  };
});

app.directive('bbPostsFormSmall', function() {
  return {
    templateUrl: 'components/posts-form-small.html'
  };
});

app.directive('bbPostsLarge', function() {
  return {
    templateUrl: 'components/posts-large.html'
  };
});

app.directive('bbPostsSmall', function() {
  return {
    templateUrl: 'components/posts-small.html'
  };
});
