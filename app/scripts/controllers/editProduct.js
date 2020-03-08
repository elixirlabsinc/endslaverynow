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
    $scope.productId = $stateParams.id ? parseInt($stateParams.id) : null;

    $scope.dataRepository = null;

    // We have to put these models in an object because the view includes a sub-view and it just doesn't
    // work otherwise.
    $scope.entity = {
      NameValue: null,
      DescriptionValue: null,
      PurchaseURLValue: null,
      Image: null
    };
    $scope.selectedBrandId = null;
    $scope.selectedCategoryId = null;

    $scope.ctrl = {
      brands: null,
      categories: null
    };

    // The id of the product suggestion that this product was generated from (if there is one).
    $scope.productSuggestionId = null;

    dataRepositoryFactory.ready(
      function () {
        $scope.dataRepository = dataRepositoryFactory.getDataRepository();

        $scope.ctrl.brands = $scope.dataRepository.getBrands();
        $scope.ctrl.categories = $scope.dataRepository.getCategories();
        $scope.products = $scope.dataRepository.getProducts();

        // Set up the individual field values.
        /**
         * @var {Product} product
         */
        var product = $scope.dataRepository.getProductById($scope.productId);
        $scope.name = product.getName();
        $scope.description = product.getDescription();
        // $scope.ranking = product.getRanking();
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

        // See if a product suggestion generated this product. If so, get its id.
        var productSuggestion = $scope.dataRepository.getSuggestedProductByProductId($scope.productId);
        $scope.productSuggestionId = productSuggestion ? productSuggestion.getId() : null;
      }
    );

    $scope.processForm = function () {
      // Start with the original product object, and overwrite any values with values the user has changed.
      /**
       * @var {Product} product
       */
      var product = $scope.dataRepository.getProductById($scope.productId);
      if ($scope.entity.NameValue) {
        product.setName($scope.entity.NameValue);
      }
      if ($scope.entity.DescriptionValue) {
        product.setDescription($scope.entity.DescriptionValue);
      }
      if ($scope.entity.PurchaseURLValue) {
        product.setPurchaseUrl($scope.entity.PurchaseURLValue);
      }
      if ($scope.selectedCategoryId) {
        product.setCategoryId($scope.selectedCategoryId);
      }
      if ($scope.selectedBrandId) {
        product.setBrandId($scope.selectedBrandId);
      }
      if ($scope.entity.Image) {
        product.setImage(dataRepositoryFactory.getStorageRepository().extractLatestImage($scope.entity.Image));
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
