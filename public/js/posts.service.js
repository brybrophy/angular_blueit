(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.factory('postsFac', postsFac);

  postsFac.$inject = ['$http'];

  function postsFac($http) {
    const convertTimestamps = (post) => {
        return Object.assign(post, {
          created_at: new Date(post.created_at).getTime(),
          updated_at: new Date(post.updated_at).getTime()
        });
    }
    return {
      addPost: function (post){
        return $http.post('/api/posts', post)
        .then((res) => {
          return convertTimestamps(res.data);
        })
        .catch((err) => {
          throw err;
        });
      },
      getAllPosts: function() {
        return $http.get('/api/posts')
          .then((res) => {
            return res.data.map(convertTimestamps);
          })
          .catch((err) => {
            throw err;
          });
      },
      updatePostRating: function(post) {
        return $http.patch(`/api/posts/${post.id}`, post)
          .then((res) => {
            return convertTimestamps(res.data);
          })
          .catch((err) => {
            throw err;
          });
      }
    }
  };
}());
