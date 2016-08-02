(function() {
  'use strict';

  angular
    .module('blueitApp')
    .config(config);

    function config($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'home.html',
          controller: 'PostsCtrl',
          controllerAs: 'posts'
        });
    };
})();
