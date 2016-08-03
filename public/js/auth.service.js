(function() {
  'use strict';

  app.factory('auth', auth);

  auth.$inject = ['$http'];

  function auth($http) {
    return {
      login: (email, password) => {
        return $http.post(`/api/token`, { email, password })
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
