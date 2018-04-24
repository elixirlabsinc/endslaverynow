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

      var itemTypes = {
        'categories': {
          name: 'Category',
          getIdFunction: getCategoryId,
        },
        'brands': {
          name: 'Brand',
          getIdFunction: getBrandId,
        },
        'products': {
          name: 'Product',
          getIdFunction: getProductId,
        }
      };

      $scope.rankingOptions = {
        'good': 'Good',
        'better': 'Better',
        'best': 'Best'
      }

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
        item = item || {};
        let id = itemTypes[$scope.formType].getIdFunction();
        item.id = id;

        if($scope.formType === 'products') {
          item.brandId = $scope.selectedBrandId;
          item.categoryId = $scope.selectedCategoryId;
          item.purchaseURlClicks = 0;
        }

        if($scope.formType === 'brands') {
          item.categories = $scope.selectedCategoryId.toString();
          item.ranking = $scope.selectedRankName;
        }

        uploadImages(item, CONFIG.APPCONFIG, $scope.formType);
      }

      $scope.setCategory = function(category) {
        $scope.selectedCategoryId = category.id;
        $scope.selectedCategoryName = category.name;
      }

      $scope.setBrand = function(brand) {
        $scope.selectedBrandId = brand.id;
        $scope.selectedBrandName = brand.name;
      }

      $scope.setRanking = function(rank) {
        $scope.selectedRankName = rank;
      }

      $scope.selectItemType = function(itemType) {
        $scope.itemType = itemType ? itemTypes[itemType].name : '';
        $scope.formType = itemType;
      }

      $scope.reloadPage = function() {
        $window.location.reload();
      }

      function getCategoryId() {
        let id = $scope.categories.length || 0;
        while($scope.categories[id] !== undefined) {
          id = id + 1;
        }
        return id;
      }

      function getBrandId() {
        let id = $scope.brands.length || 0;
        while($scope.brands[id] !== undefined) {
          id = id + 1;
        }
        return id;
      }

      function getProductId() {
        let id = $scope.products.length || 0;
        while($scope.products[id] !== undefined) {
          id = id + 1;
        }
        return id;
      }

  }]);
