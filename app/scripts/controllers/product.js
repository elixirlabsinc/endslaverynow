'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
  .controller('ProductCtrl', [
    '$firebaseArray',
    '$firebaseObject',
    '$routeParams',
    '$scope',
    'CONFIG',
    function($firebaseArray, $firebaseObject, $routeParams, $scope, CONFIG){
      $scope.productId = $routeParams.id;
      $scope.productClicked = false;
      var firebaseRef = CONFIG.FIREBASEURL;

      /* firebase */
      var firebase = new Firebase(firebaseRef);
      var syncObject = $firebaseObject(firebase);
      syncObject.$loaded().then(function() {
          // Get product information
          $scope.productDetails = syncObject.products[$scope.productId];

          if($scope.productDetails === null) {
              return;
          }

          // TODO: CHECK FOR BRAND ID IN PRODUCTD DETAILS BEFORE ASSIGNING BRAND DETAILS
          $scope.brandDetails = syncObject.brands[$scope.productDetails.brandId];
          $scope.categoryDetails = syncObject.categories[$scope.productDetails.categoryId];

          $scope.loaded = true;
      });

      syncObject.$bindTo($scope, "data");

      $scope.updateClickCount = function() {
          // Spam Click check - not too sophisticated atm
          if(!$scope.productClicked) {
              $scope.productClicked = true;
              var updatedClickCount = parseInt($scope.productDetails.purchaseURlClicks) + 1;
              $scope.data.products[$scope.productId].purchaseURlClicks = updatedClickCount;   
          }
      };
    }]);
