'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:SessionsCtrl
 * @description
 * # SessionsCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
  .controller('SessionsCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    function($scope, $rootScope, $state) {
      $scope.loginUser = function(credentials) {
        firebase.auth().signInWithEmailAndPassword(
          credentials["email"],
          credentials["password"]
        ).then(
          function(user) {
            $rootScope.currentUser = user
            $state.go('admin')
          },
          function(error) {
            window.alert('Error: ' + error.message)
          }
        )
      }

      $scope.logoutUser = function() {
        firebase.auth().signOut().then(
          function() {
            $state.go('login')
          },
          function(error) {
            window.alert('Error logging out: ' + error)
          }
        )
      }
    }
  ])
