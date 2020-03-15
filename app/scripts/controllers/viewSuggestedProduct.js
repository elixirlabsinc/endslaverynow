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
    'ProductSuggestionStatuses',
    'MailerService',
    function ($transition$, $scope, $location, dataRepositoryFactory, ProductSuggestionStatuses, MailerService) {
      $scope.ProductSuggestionStatuses = ProductSuggestionStatuses;
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
        // @TODO: For now, this step is skipped.
        if (validationCode.toLowerCase().indexOf('a1') === 0) {
          $scope.suggestedProduct.setStatus($scope.ProductSuggestionStatuses.inReview);

          var persistService = new PersistService(
            dataRepositoryFactory,
            $scope.dataRepository,
            dataRepositoryFactory.getStorageRepository()
          );
          var onCompletion = function onCompletion() {
            // Show a message on screen when the status is changed.
            $scope.validated = true;

            // Send an email to confirm they have validated their code.
            // @TODO: Include enough data from the product for the suggester to be able to identify it.
            // @TODO: Sort out any wording. Remove this if we don't use validation codes.
            $scope.mailerService.send(
              $scope.suggestedProduct.getSuggesterEmailAddress(),
              'Thank you for validating your code',
              'The URL is: '+$location.absUrl()
            );
          };

          persistService.processProductSuggestion($scope.suggestedProduct, null, onCompletion);
        } else {
          window.alert('Sorry, that code is not valid. Please try again');
        }
      };
    }
  ]
);
