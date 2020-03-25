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
  'ProductSuggestionStatuses',
  function ($scope, dataRepositoryFactory, ProductSuggestionStatuses) {
    $scope.dataRepository = null;
    $scope.ProductSuggestionStatuses = ProductSuggestionStatuses;

    $scope.loaded = false;

    // Include product suggestions in these states. User can toggle any of the flags. Defaults to just "review".
    $scope.include = {
      inReview: $scope.ProductSuggestionStatuses.inReview,
      approved: $scope.ProductSuggestionStatuses.approved,
      rejected: $scope.ProductSuggestionStatuses.rejected
    };
    // This only seems to work if it's an object!
    $scope.includeFilter = {
      value: $scope.include.inReview
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
          return suggestedProduct.getStatus() === $scope.includeFilter.value;
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

    /**
     * @param {ProductSuggestion|Product} suggestedProduct
     */
    $scope.getReviewButtonText = function getReviewButtonText(suggestedProduct) {
      return suggestedProduct.getStatus() === $scope.include.inReview ? 'Review...' : 'View...';
    };
  }
])
;
