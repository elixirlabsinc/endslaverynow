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
      $scope.errorMessage = false;

      var itemTypes = {
        'categories': {
          name: 'Category',
          getIdFunction: getCategoryId,
          requiredInputs: {
            name: true,
            description: true,
            purchaseUrl: false,
            image: true,
            category: false,
            categories: false,
            brand: false,
            ranking: false
          },
        },
        'brands': {
          name: 'Brand',
          getIdFunction: getBrandId,
          requiredInputs: {
            name: true,
            description: true,
            purchaseUrl: false,
            image: true,
            category: false,
            categories: true,
            brand: false,
            ranking: true
          },
        },
        'products': {
          name: 'Product',
          getIdFunction: getProductId,
          requiredInputs: {
            name: true,
            description: true,
            purchaseUrl: true,
            image: true,
            category: true,
            brand: true,
            ranking: false
          },
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
        $scope.errorMessage = false;
        if(!item) {
          $scope.errorMessage = true;
          return;
        }

        var id = itemTypes[$scope.formType].getIdFunction();
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

        if(!invalidInput(item, $scope.formType, itemTypes[$scope.formType].requiredInputs)) {
          $scope.errorMessage = true;
          return;
        } else {
          uploadImages(item, CONFIG.APPCONFIG, $scope.formType);
        }
      }

      var invalidInput = function(item, formType, requiredInputs) {
        var isValid = !!item;

        for(var req in requiredInputs) {
          if(requiredInputs[req] && !item[req]) {
            isValid = false;
          }
        }

        return isValid;
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
        var id = $scope.categories ? $scope.categories.length : 1;
        while($scope.categories[id] !== undefined) {
          id = id + 1;
        }
        return id;
      }

      function getBrandId() {
        var id = $scope.brands ? $scope.brands.length : 1;
        while($scope.brands[id] !== undefined) {
          id = id + 1;
        }
        return id;
      }

      function getProductId() {
        var id = $scope.products ? $scope.products.length : 1;
        while($scope.products[id] !== undefined) {
          id = id + 1;
        }
        return id;
      }

  }]);
