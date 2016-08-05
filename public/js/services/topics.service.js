(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.factory('topicsFac', topicsFac);

  topicsFac.$inject = ['$http'];

  function topicsFac($http) {
    return {
      addTopic: function(topic) {
        return $http.post('/api/topics', topic)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          throw err;
        });
      },
      getTopics: function() {
        return $http.get('/api/topics')
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
