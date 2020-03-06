'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditSuggestedProductCtrl
 * @description
 * # EditSuggestedProductCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditSuggestedProductCtrl', [
  '$scope',
  '$transition$',
  '$state',
  'dataRepositoryFactory',
  function ($scope, $transition$, $state, dataRepositoryFactory) {
    $scope.loaded = false;
    $scope.suggestedProductId = parseInt($transition$.params().id);

    $scope.entity = {
      NameValue: null,
      DescriptionValue: null,
      PurchaseURLValue: null,
      selectedBrandId: null,
      Image: null
    };
    $scope.selectedBrandId = null;
    $scope.selectedCategoryId = null;

    $scope.ctrl = {
      brands: null,
      categories: null
    };

    dataRepositoryFactory.ready(
      function () {
        $scope.dataRepository = dataRepositoryFactory.getDataRepository();

        // @TODO: Do this as a ctrl object.
        $scope.ctrl.brands = $scope.dataRepository.getBrands();
        $scope.ctrl.categories = $scope.dataRepository.getCategories();
        $scope.products = $scope.dataRepository.getProducts();

        // Set up the individual field values.
        /**
         * @var {ProductSuggestion} suggestedProduct
         */
        var suggestedProduct = $scope.dataRepository.getSuggestedProductById($scope.suggestedProductId);
        $scope.name = suggestedProduct.getName();
        $scope.description = suggestedProduct.getDescription();
        $scope.purchaseURL = suggestedProduct.getPurchaseUrl();
        // $scope.ranking = suggestedProduct.getRanking();
        $scope.image = suggestedProduct.getImage();
        $scope.CategoryId = suggestedProduct.getCategoryId();
        $scope.BrandId = suggestedProduct.getBrandId();

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
          $scope.entity.selectedBrandId = brand.getId();
          $scope.selectedBrandName = brand.getName();
        };

        // @TODO: We might not need this, but leave it here because I think edit mode will need it.
        $scope.persistService = new PersistService(
          dataRepositoryFactory,
          $scope.dataRepository,
          dataRepositoryFactory.getStorageRepository()
        );

        $scope.loaded = true;
      }
    );

    $scope.processForm = function () {
console.log('processForm...');
      // Start with the original product suggestion object, and overwrite any values with values the user
      // has changed.
      /**
       * @var {ProductSuggestion} productSuggestion
       */
      var productSuggestion = $scope.dataRepository.getSuggestedProductById($scope.suggestedProductId);
      if ($scope.entity.NameValue) {
        productSuggestion.setName($scope.entity.NameValue);
      }
console.log('Desc:', $scope.entity.DescriptionValue);
      if ($scope.entity.DescriptionValue) {
        productSuggestion.setDescription($scope.entity.DescriptionValue);
      }
      if ($scope.entity.PurchaseURLValue) {
        productSuggestion.setPurchaseUrl($scope.entity.PurchaseURLValue);
      }
console.log('$scope.selectedCategoryId:', $scope.selectedCategoryId);
      if ($scope.selectedCategoryId) {
        productSuggestion.setCategoryId($scope.selectedCategoryId);
      }
      if ($scope.entity.selectedBrandId) {
        productSuggestion.setBrandId($scope.entity.selectedBrandId);
      }
      if ($scope.entity.Image) {
        productSuggestion.setImage(dataRepositoryFactory.getStorageRepository().extractLatestImage($scope.entity.Image));
      }

      $scope.persistService.processProductSuggestion(
        productSuggestion,
        'Edit has been completed!',
        function () {
          $state.go('admin.reviewSuggestedProduct', {id: $scope.suggestedProductId});
        }
      );
    };
  }
])
;
