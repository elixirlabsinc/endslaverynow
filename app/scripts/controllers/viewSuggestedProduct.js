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
    'StatusMapperService',
    'CommunicationsHelperService',
    function ($transition$, $scope, $location, dataRepositoryFactory, ProductSuggestionStatuses, StatusMapperService, CommunicationsHelperService) {
      $scope.ProductSuggestionStatuses = ProductSuggestionStatuses;
      $scope.statusMapperService = StatusMapperService;
      $scope.communicationsHelperService = CommunicationsHelperService;
      $scope.suggestedProductRowid = $transition$.params().rowid;
      $scope.baseUrl = $location.absUrl();
      $scope.loaded = false;
      $scope.found = false;
      $scope.verified = false;
      $scope.isAdminUser = false;

      $scope.category = null;
      $scope.brand = null;

      $scope.verificationCode = null;

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

          // Now we know firebase has initialised, set the flag to say whether the user is logged in
          // as an admin user or not.
          $scope.isAdminUser = firebase.auth().currentUser !== null;
        }
      );

      $scope.navigateToSuggestAProduct = function() {
        $location.path('/suggestProduct');
      };

      $scope.verifyCode = function(verificationCode) {
        // Extract the code out of the product suggestion and simply compare them.
        // @TODO: Would be nice to make it pause for a couple of seconds after an incorrect entry, to make it harder to brute force?
        if (verificationCode === $scope.suggestedProduct.extractVerificationCode()) {
          $scope.suggestedProduct.setStatus($scope.ProductSuggestionStatuses.inReview);

          var persistService = new PersistService(
            dataRepositoryFactory,
            $scope.dataRepository,
            dataRepositoryFactory.getStorageRepository()
          );
          var onCompletion = function onCompletion() {
            // Show a message on screen when the status is changed.
            $scope.verified = true;

            // Send an email to confirm they have verified their code.
            $scope.communicationsHelperService.afterCodeVerification($scope.suggestedProduct);
          };

          persistService.processProductSuggestion($scope.suggestedProduct, null, onCompletion);
        } else {
          window.alert('Sorry, that code is not valid. Please try again');
        }
      };
    }
  ]
);
