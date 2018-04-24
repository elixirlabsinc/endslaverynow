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
    '$window',
    'CONFIG',
    'Upload',
    function ($firebaseArray, $firebaseObject, $routeParams, $scope, $window, CONFIG, Upload) {
      $scope.brandId = $routeParams.id;
      $scope.loaded = false;

      $scope.formType = '';

      /* firebase */
      var firebase = new Firebase(CONFIG.FIREBASEURL);
      var syncObject = $firebaseObject(firebase);
      $scope.products = [];

      syncObject.$loaded().then(function() {
          $scope.brands = syncObject.brands;
          $scope.categories = syncObject.categories;
          $scope.products = syncObject.products;

          $scope.loaded = true;
      });

      $scope.processForm = function(item) {

        if($scope.formType === 'products') {
          item = item || {};
          let id = getId();
          item.id = id;
          item.brandId = $scope.selectedBrandId;
          item.categoryId = $scope.selectedCategoryId;
          item.purchaseURlClicks = 0;

          uploadImages(item, CONFIG.APPCONFIG, $scope.formType);
        }
      }

      $scope.setCategory = function(category) {
        $scope.selectedCategoryId = category.id;
        $scope.selectedCategoryName = category.name;
      }

      $scope.setBrand = function(brand) {
        $scope.selectedBrandId = brand.id;
        $scope.selectedBrandName = brand.name;
      }

      $scope.selectItemType = function(itemType) {
        $scope.formType = itemType;
      }

      $scope.reloadPage = function() {
        $window.location.reload();
      }

      function getId() {
        let id = $scope.products.length || 0;
        while($scope.products[id] !== undefined) {
          id = id + 1;
        }
        return id;
      }

  }]);
