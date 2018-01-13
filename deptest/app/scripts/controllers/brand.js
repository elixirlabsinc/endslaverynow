'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:BrandCtrl
 * @description
 * # BrandCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
  .controller('BrandCtrl', [
    '$firebaseArray',
    '$firebaseObject',
    '$routeParams',
    '$scope',
    function ($firebaseArray, $firebaseObject, $routeParams, $scope) {
      $scope.brandId = $routeParams.id;
      $scope.loaded = false;
      $scope.brandProducts = [];
      $scope.relatedCategories = [];

      /* firebase */
      var firebase = new Firebase("https://end-slavery-now.firebaseio.com");
      var syncObject = $firebaseObject(firebase);

      syncObject.$loaded().then(function() {
          // Get brand information
          $scope.brandDetails = syncObject.brands[$scope.brandId];

          if($scope.brandDetails === null) {
              return;
          }

          // Get products for this brand
          for(var prod in syncObject.products) {
              var temp = syncObject.products[prod];
              if(temp.brandId == $scope.brandId) {
                  $scope.brandProducts.push(temp);
              }
          }
          
          $scope.relatedCategoryIds = $scope.brandDetails.categories.split(",");
          for(var rcat in $scope.relatedCategoryIds) {
              $scope.relatedCategories.push(syncObject.categories[$scope.relatedCategoryIds[rcat]]);
          }

          $scope.loaded = true;
      });

  }]);
