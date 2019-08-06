'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditBrandsCtrl
 * @description
 * # EditBrandsCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditProductsCtrl', [
  '$scope',
  '$state',
  'dataRepositoryFactory',
  function ($scope, $state, dataRepositoryFactory) {
    $scope.dataRepository = null;

    $scope.loaded = false;

    $scope.products = [];

    dataRepositoryFactory.ready(
      function () {
        $scope.dataRepository = dataRepositoryFactory.getDataRepository();
        $scope.products = $scope.dataRepository.getProducts();

        $scope.loaded = true;
      }
    );

    $scope.getNameForBrandId = function getNameForBrandId(brandId) {
      if (brandId) {
        var referencedBrand = $scope.dataRepository.getBrandById(brandId);
        return referencedBrand ? referencedBrand.getName() : '';
      } else {
        return '';
      }
    };

    $scope.getNameForCategoryId = function getNameForCategoryId(categoryId) {
      if (categoryId) {
        var referencedCategory = $scope.dataRepository.getCategoryById(categoryId);
        return referencedCategory ? referencedCategory.getName() : '';
      } else {
        return '';
      }
    };

    /**
     * @param {Product} product
     */
    $scope.deleteProduct = function (product) {
      var prompt = "Are you sure you want to delete product '" + product.getName() + "'?";
      if (!window.confirm(prompt)) {
        return;
      }
      $scope.dataRepository.deleteProduct(
        product,
        function () {
          window.alert('Product has been deleted');
          $state.reload();
        }
      );
    };

  }
]);
