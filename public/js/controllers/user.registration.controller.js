(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('RegisterCtrl', RegisterCtrl);

  RegisterCtrl.$inject = ['registration', '$location'];

  function RegisterCtrl(registration, $location) {
    this.username = '';
    this.email = '';
    this.password = '';
    this.couldNotRegister = '';
    this.registered = '';
    this.button = 'Cancel';

    this.newUser = (registerForm) => {
      registration.register(this.username, this.email, this.password)
        .then((user) => {
          this.registered = 'Registration Complete! Please login.';
          this.username = '';
          this.email = '';
          this.password = '';
          this.button = 'Close'
          registerForm.$setPristine();
          $location.path('/');
        })
        .catch((err) => {
          this.couldNotRegister = 'User could not be registered. Please try again';
          throw err;
        });
    };
  };
}());
