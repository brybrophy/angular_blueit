(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('RegisterCtrl', RegisterCtrl);

  RegisterCtrl.$inject = ['registration', '$location'];

  function RegisterCtrl(registration, $location) {
    this.username = '';
    this.email = '';
    this.password = '';

    this.newUser = () => {
      registration.register(this.username, this.email, this.password)
        .then((user) => {
          $location.path('/');
        })
        .catch((err) => {
          //change later
          alert('Registration Failed');
        });
    };
  };
}());
