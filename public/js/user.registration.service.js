(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.factory('registration', registration);

  registration.$inject = ['$http'];

  function registration($http) {
    return {
      register: (username, email, password) => {
        return $http.post(`/api/users`, { username, email, password })
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
