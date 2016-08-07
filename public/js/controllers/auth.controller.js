(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('AuthorizeCtrl', AuthorizeCtrl);

  AuthorizeCtrl.$inject = ['auth', '$location', '$cookies'];

  function AuthorizeCtrl(auth, $location, $cookies) {
    this.show = false;
    this.couldNotLogIn = '';

    this.isLoggedIn = () => {
      return $cookies.get('loggedIn');
    };

    this.login = (loginForm) => {
      auth.login(this.loginForm.username, this.loginForm.password)
        .then((user) => {
          this.couldNotLogIn = '';
          $location.path('/');
        })
        .catch((err) => {
          this.couldNotLogIn = 'User could not be logged in. Please try again.';
          throw err;
        });

      this.loginForm.username = '';
      this.loginForm.password = '';
      loginForm.$setPristine();
    };

    this.logout = () => {
      auth.logout();
    };
  };
}());
