'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:ViewSuggestedProductCtrl
 * @description
 * # ViewSuggestedProductCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
  .controller('ViewSuggestedProductCtrl', [
    '$transition$',
    '$scope',
    '$location',
    'dataRepositoryFactory',
    function ($transition$, $scope, $location, dataRepositoryFactory) {
      $scope.suggestedProductRowid = $transition$.params().rowid;
      $scope.loaded = false;
      $scope.found = false;
      $scope.validated = false;

      $scope.category = null;
      $scope.brand = null;

      $scope.validationCode = null;

      dataRepositoryFactory.ready(
        function () {
          var dataRepository = dataRepositoryFactory.getDataRepository();
          $scope.suggestedProduct = dataRepository.getSuggestedProductByRowid($scope.suggestedProductRowid);

          $scope.loaded = true; // Data repository has all the data.

          if ($scope.suggestedProduct === null) {
            return;
          }

          if ($scope.suggestedProduct.getCategoryId()) {
            $scope.category = dataRepository.getCategoryById($scope.suggestedProduct.getCategoryId());
          }

          if ($scope.suggestedProduct.getBrandId()) {
            $scope.brand = dataRepository.getBrandById($scope.suggestedProduct.getBrandId());
          }

          $scope.found = true; // The rowid was valid, and we retrieved the record.
          $scope.dataRepository = dataRepository;
        }
      );

      $scope.navigateToSuggestAProduct = function() {
        $location.path('/suggestProduct');
      };

      $scope.validateCode = function(validationCode) {
        // @TODO: Use the proper services to validate the code. For now, if it starts "a1", assume it's valid.
        if (validationCode.toLowerCase().indexOf('a1') === 0) {
          // @TODO: We should use the status value from the service/object/whatever.
          $scope.suggestedProduct.setStatus('in review');

          var persistService = new PersistService(
            dataRepositoryFactory,
            $scope.dataRepository,
            dataRepositoryFactory.getStorageRepository()
          );
          var onCompletion = function onCompletion() {
            // Show a message on screen when the status is changed.
            $scope.validated = true;
          };

          persistService.processProductSuggestion($scope.suggestedProduct, null, onCompletion);
        } else {
          window.alert('Sorry, that code is not valid. Please try again');
        }
      };
    }
  ]
);
