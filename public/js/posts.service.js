(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.factory('postsFac', postsFac);

  postsFac.$inject = ['$http'];

  function postsFac($http) {
    return {
      addPost: function (post){
        return $http.post('/api/posts', post)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          throw err;
        });
      },
      getAllPosts: function() {
        return $http.get('/api/posts')
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            throw err;
          });
      }
    }
  };
}());
