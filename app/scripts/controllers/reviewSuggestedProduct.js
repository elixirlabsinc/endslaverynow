'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:ReviewSuggestedProductCtrl
 * @description
 * # ReviewSuggestedProductCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('ReviewSuggestedProductCtrl', [
  '$scope',
  '$location',
  '$transition$',
  'dataRepositoryFactory',
  function ($scope, $location, $transition$, dataRepositoryFactory) {
    $scope.dataRepository = null;
    $scope.suggestedProductId = parseInt($transition$.params().id);
    $scope.category = null;
    $scope.brand = null;

    $scope.loaded = false;

    $scope.suggestedProduct = null;

    dataRepositoryFactory.ready(
      function () {
        $scope.dataRepository = dataRepositoryFactory.getDataRepository();
        $scope.suggestedProduct = $scope.dataRepository.getSuggestedProductById($scope.suggestedProductId);
        $scope.persistService = new PersistService(
          dataRepositoryFactory,
          $scope.dataRepository,
          dataRepositoryFactory.getStorageRepository()
        );

        $scope.category = $scope.dataRepository.getCategoryById($scope.suggestedProduct.getCategoryId());
        $scope.brand = $scope.dataRepository.getBrandById($scope.suggestedProduct.getBrandId());

        $scope.loaded = true;
      }
    );

    $scope.isValid = function isValid()
    {
      // Check that every field is populated.
      // @TODO: /scripts/controllers/formAdd.js has this list (or at least a similar one) - needs to be held centrally.
      return (
        $scope.suggestedProduct.getName() &&
        $scope.suggestedProduct.getDescription() &&
        $scope.suggestedProduct.getPurchaseUrl() &&
        $scope.suggestedProduct.getImage() &&
        $scope.suggestedProduct.getCategoryId() &&
        $scope.suggestedProduct.getBrandId()
      );
    };

    $scope.reject = function reject() {
      if (!window.confirm('Are you sure you want to reject this product suggestion?')) {
        return;
      }

      $scope.suggestedProduct.setStatus('rejected'); // @TODO: Need to use a constant here.
      $scope.persistService.processProductSuggestion($scope.suggestedProduct, 'This product suggestion has been rejected');
    };

    $scope.unreject = function unreject() {
      if (!window.confirm('Are you sure you want to put this product suggestion back in to review?')) {
        return;
      }

      $scope.suggestedProduct.setStatus('in review'); // @TODO: Need to use a constant here.
      $scope.persistService.processProductSuggestion($scope.suggestedProduct, 'This product suggestion has been moved back to "in review"');
    };

    $scope.deleteSuggestion = function deleteSuggestion() {
      if (!window.confirm('Are you sure you want to permanently delete this product suggestion? This operation cannot be undone.')) {
        return;
      }

      $scope.dataRepository.deleteProductSuggestion(
        $scope.suggestedProduct,
        function () {
          window.alert('This product suggestion has been deleted');
          // We need to navigate back to the suggestions list page.
          $location.path('/admin/listSuggestedProducts');

        });
    };

    $scope.approve = function approve() {
      window.alert('This code has not been written yet!');
      // @TODO: show a confirmation message.
      // @TODO: create a product from the data in the suggested product, and save it.
      // @TODO: put the id of the new product in the suggested product record, change the status to pending and save it.
    };
  }
])
;
