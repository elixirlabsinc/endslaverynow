'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the endslaverynowApp
 */
 angular.module('endslaverynowApp')
  .controller('UsersCtrl', [
    '$scope',
    function($scope) {
      $scope.createUser = function(credentials) {
        firebase.auth().createUserWithEmailAndPassword(
          credentials["email"],
          credentials["password"]
        ).then(
          function(userData) {
            window.alert(`Login created for ${userData.email}`)
            window.location.reload()
          },
          function(error) {
            window.alert(`Error: ${error.message}`)
          }
        )
      }
    }
  ])
