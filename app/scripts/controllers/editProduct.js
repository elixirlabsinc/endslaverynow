'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditProductCtrl
 * @description
 * # EditCategoryCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditProductCtrl', [
  '$stateParams',
  '$scope',
  '$state',
  'dataRepositoryFactory',
  function ($stateParams, $scope, $state, dataRepositoryFactory) {
    $scope.productId = $stateParams.id;

    $scope.dataRepository = null;

    $scope.NameValue = null;
    $scope.DescriptionValue = null;
    $scope.PurchaseURLValue = null;
    $scope.selectedCategoryId = null;
    $scope.selectedBrandId = null;
    $scope.Image = null;

    dataRepositoryFactory.ready(
      $scope,
      function () {
        $scope.dataRepository = dataRepositoryFactory.getDataRepository();

        $scope.brands = $scope.dataRepository.getBrands();
        $scope.categories = $scope.dataRepository.getCategories();
        $scope.products = $scope.dataRepository.getProducts();

        // Set up the individual field values.
        /**
         * @var {Product} product
         */
        var product = $scope.dataRepository.getProductById($scope.productId);
        $scope.name = product.getName();
        $scope.description = product.getDescription();
        $scope.ranking = product.getRanking();
        $scope.image = product.getImage();
        $scope.CategoryId = product.getCategoryId();
        $scope.BrandId = product.getBrandId();
        $scope.purchaseURL = product.getPurchaseUrl();

        $scope.brand = $scope.dataRepository.getBrandById($scope.BrandId);
        $scope.cat = $scope.dataRepository.getCategoryById($scope.CategoryId);

        $scope.loaded = true;

        /**
         * @param category {Category}
         */
        $scope.setCategory = function (category) {
          $scope.selectedCategoryId = category.getId();
          $scope.selectedCategoryName = category.getName();
        };
        /**
         * @param brand {Brand}
         */
        $scope.setBrand = function (brand) {
          $scope.selectedBrandId = brand.getId();
          $scope.selectedBrandName = brand.getName();
        };
      }
    );

    $scope.processForm = function () {
      // Start with the original product object, and overwrite any values with values the user has changed.
      /**
       * @var {Product} product
       */
      var product = $scope.dataRepository.getProductById($scope.productId);
      if ($scope.NameValue) {
        product.setName($scope.NameValue);
      }
      if ($scope.DescriptionValue) {
        product.setDescription($scope.DescriptionValue);
      }
      if ($scope.PurchaseURLValue) {
        product.setPurchaseUrl($scope.PurchaseURLValue);
      }
      if ($scope.selectedCategoryId) {
        product.setCategoryId($scope.selectedCategoryId);
      }
      if ($scope.selectedBrandId) {
        product.setBrandId($scope.selectedBrandId);
      }
      if ($scope.Image) {
        product.setImage($scope.Image);
      }

      var persistService = new PersistService(
        dataRepositoryFactory,
        $scope.dataRepository,
        dataRepositoryFactory.getStorageRepository()
      );
      persistService.processProduct(
        product,
        'Edit has been completed!',
        function () {
          $state.go('admin.editProducts');
        }
      );
    };
  }
]);
