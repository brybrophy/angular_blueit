(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('AuthorizeCtrl', AuthorizeCtrl);

  AuthorizeCtrl.$inject = ['auth', '$location', '$cookies'];

  function AuthorizeCtrl(auth, $location, $cookies) {
    this.username = '';
    this.password = '';
    this.show = false;

    this.isLoggedIn = () => {
      return $cookies.get('loggedIn');
    };

    this.login = () => {
      auth.login(this.username, this.password)
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
