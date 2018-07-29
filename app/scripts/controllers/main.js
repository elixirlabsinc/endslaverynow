'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
  .controller('MainCtrl', [
    '$scope',
    '$firebaseArray',
    '$firebaseObject',
    'CONFIG',
    function ($scope, $firebaseArray, $firebaseObject, CONFIG) {
      $scope.brands = [];
      $scope.products = [];
      $scope.categories = [];
  
      /* firebase */
      var firebase = new Firebase(CONFIG.FIREBASEURL);
      var syncObject = $firebaseObject(firebase);
      
      syncObject.$loaded().then(function() {
        for(var brand in syncObject.brands) {
            var tempBrand = syncObject.brands[brand];
            $scope.brands.push(tempBrand);
        }
  
        for(var product in syncObject.products) {
            var tempProd = syncObject.products[product];
            $scope.products.push(tempProd);
        }
  
        for(var category in syncObject.categories) {
            var tempCat = syncObject.categories[category];
            debugger
            if (!(tempCat.parentCategoryId > 0)) {
              $scope.categories.push(tempCat);
            }
        }
  
        $scope.loaded = true;
      });
      
  }]);
