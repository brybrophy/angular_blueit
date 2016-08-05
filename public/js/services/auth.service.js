(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.factory('auth', auth);

  auth.$inject = ['$http'];

  function auth($http) {
    return {
      login: (username, password) => {
        return $http.post(`/api/token`, { username, password })
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            throw err;
          });
      },
      logout: () => {
        return $http.delete(`/api/token`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          throw err;
        });
      }
    };
  }
}());
