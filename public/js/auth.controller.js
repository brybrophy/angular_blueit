(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('AuthCtrl', AuthCtrl);

  AuthCtrl.$inject = ['auth', '$location', '$cookies'];

  function AuthCtrl(auth, $location, $cookies) {
    this.email = '';
    this.password = '';

    this.isLoggedIn = () => {
      return $cookies.get('loggedIn');
    };

    this.login = () => {
      auth.login(this.email, this.password)
        .then((user) => {
          $location.path('/');
        })
        .catch((err) => {
          alert('Login Failed');
        });
    };

    this.logout = () => {
      auth.logout();
    };
  };
}());
