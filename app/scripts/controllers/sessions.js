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
    function($scope, $rootScope) {
      $scope.loginUser = function(credentials) {
        firebase.auth().signInWithEmailAndPassword(
          credentials["email"],
          credentials["password"]
        ).then(
          function(user) {
            $rootScope.currentUser = user
            window.location.href = '/#!/editCategories'
          },
          function(error) {
            window.alert(`Error: ${error.message}`)
          }
        )
      }

      $scope.logoutUser = function() {
        firebase.auth().signOut().then(
          function() {
            location.href = '#!/login'
          },
          function(error) {
            window.alert(`Error logging out: ${error}`)
          }
        )
      }
    }
  ])
