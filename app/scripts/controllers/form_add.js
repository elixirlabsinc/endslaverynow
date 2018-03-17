'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:FormAddCtrl
 * @description
 * # FormAddCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
  .controller('FormAddCtrl',[
    '$firebaseArray',
    '$firebaseObject',
    '$routeParams',
    '$scope',
    'CONFIG',
    function ($firebaseArray, $firebaseObject, $routeParams, $scope, CONFIG) {
      $scope.brandId = $routeParams.id;
      $scope.loaded = false;

      /* firebase */
      var firebase = new Firebase(CONFIG.FIREBASEURL);
      var syncObject = $firebaseObject(firebase);
      $scope.products = [];

      syncObject.$loaded().then(function() {
          // Get brand information
          $scope.brands = syncObject.brands;
          $scope.categories = syncObject.categories;
          $scope.products = syncObject.products;

          $scope.loaded = true;
      });

      $scope.processForm = function(item) {
        item = item || {};
        let id = getId();
        item.id = id;
        item.brandId = $scope.selectedBrandId;
        item.categoryId = $scope.selectedCategoryId;
        item.purchaseURlClicks = 0;
        console.log(item);
        syncObject.products.push(item);
        console.log(syncObject);
        syncObject.$save().then(function() {
          console.log('success');
        }).catch(function() {
          console.log('error');
        });
      }

      $scope.setCategory = function(category) {
        $scope.selectedCategoryId = category.id;
        $scope.selectedCategoryName = category.name;
      }

      $scope.setBrand = function(brand) {
        $scope.selectedBrandId = brand.id;
        $scope.selectedBrandName = brand.name;
      }

      function getId() {
        let id = $scope.products.length;
        while($scope.products[id] !== undefined) {
          id = id + 1;
        }
        return id;
      }

  }]);
