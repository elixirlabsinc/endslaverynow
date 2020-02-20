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
  '$transition$',
  'dataRepositoryFactory',
  function ($scope, $transition$, dataRepositoryFactory) {
    $scope.dataRepository = null;
    $scope.suggestedProductId = parseInt($transition$.params().id);

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

        $scope.loaded = true;
      }
    );

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
      $scope.persistService.processProductSuggestion($scope.suggestedProduct, 'This product suggestion has been move back to "in review"');
    };
  }
])
;
