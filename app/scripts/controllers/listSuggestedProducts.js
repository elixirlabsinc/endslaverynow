'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:ListSuggestedProductsCtrl
 * @description
 * # ListSuggestedProductsCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('ListSuggestedProductsCtrl', [
  '$scope',
  'dataRepositoryFactory',
  function ($scope, dataRepositoryFactory) {
    $scope.dataRepository = null;

    $scope.loaded = false;

    // Include product suggestions in these states. User can toggle any of the flags. Defaults to just pending.
    // @TODO: The keys should be provided by a service.
    $scope.include = {
      'pending': true,
      'approved': false,
      'rejected': false
    };

    $scope.suggestedProducts = [];

    dataRepositoryFactory.ready(
      function () {
        $scope.dataRepository = dataRepositoryFactory.getDataRepository();
        $scope.suggestedProducts = $scope.dataRepository.getSuggestedProducts();

        // Sort them by newest first.
        $scope.suggestedProducts.sort(
          function (sp1, sp2) {
            return sp2.getCreatedAtUtc() - sp1.getCreatedAtUtc();
          }
        );

        $scope.loaded = true;
      }
    );

    /**
     * @return {ProductSuggestion[]|Product[]}
     */
    $scope.getFilteredSuggestedProducts = function getFilteredSuggestedProducts() {
      return $scope.suggestedProducts.filter(
        function (suggestedProduct) {
          return (suggestedProduct.getStatus() === 'pending' && $scope.include.pending) ||
            (suggestedProduct.getStatus() === 'approved' && $scope.include.approved) ||
            (suggestedProduct.getStatus() === 'rejected' && $scope.include.rejected);
        }
      );
    };

    /**
     * @param {ProductSuggestion|Product} suggestedProduct
     */
    $scope.getCategory = function getCategory(suggestedProduct) {
      if (suggestedProduct.getCategoryId()) {
        return this.dataRepository.getCategoryById(suggestedProduct.getCategoryId()).getName();
      }

      return null;
    };

    /**
     * @param {ProductSuggestion|Product} suggestedProduct
     */
    $scope.getBrand = function getBrand(suggestedProduct) {
      if (suggestedProduct.getBrandId()) {
        return this.dataRepository.getBrandById(suggestedProduct.getBrandId()).getName();
      }

      return null;
    };
  }
])
;
