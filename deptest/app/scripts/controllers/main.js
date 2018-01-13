'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
  .controller('MainCtrl', ['$scope', '$firebaseArray', '$firebaseObject',
    function ($scope, $firebaseArray, $firebaseObject) {
    
      $scope.brands = [];
      $scope.products = [];
      $scope.categories = [];
  
      /* firebase */
      var firebase = new Firebase("https://end-slavery-now.firebaseio.com");
      var syncObject = $firebaseObject(firebase);
      
      syncObject.$loaded().then(function() {
        for(var brand in syncObject.brands) {
            var temp = syncObject.brands[brand];
            $scope.brands.push(temp);
        }
  
        for(var product in syncObject.products) {
            var temp = syncObject.products[product];
            $scope.products.push(temp);
        }
  
        for(var category in syncObject.categories) {
            var temp = syncObject.categories[category];
            if(temp.parentCategoryId == 0) {
              $scope.categories.push(temp);
            }
        }
  
        $scope.loaded = true;
      });
      
  }]);
