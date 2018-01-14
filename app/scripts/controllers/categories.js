'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:CategoriesCtrl
 * @description
 * # CategoriesCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
  .controller('CategoriesCtrl', [
    '$firebaseArray',
    '$firebaseObject',
    '$routeParams',
    '$scope',
    function($firebaseArray, $firebaseObject, $routeParams, $scope){
      $scope.loaded = false;
      $scope.allCategories = [];

      /* firebase */
      var firebase = new Firebase("https://end-slavery-now.firebaseio.com");
      var syncObject = $firebaseObject(firebase);

      syncObject.$loaded().then(function() {
          for(var cat in syncObject.categories) {
              $scope.allCategories.push(syncObject.categories[cat]);
          }

          $scope.loaded = true;
      });
    }]);
