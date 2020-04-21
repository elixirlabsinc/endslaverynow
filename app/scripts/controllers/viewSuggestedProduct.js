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
    '$timeout',
    'dataRepositoryFactory',
    'ProductSuggestionStatuses',
    'StatusMapperService',
    'CommunicationsHelperService',
    function ($transition$, $scope, $location, $timeout, dataRepositoryFactory, ProductSuggestionStatuses, StatusMapperService, CommunicationsHelperService) {
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

      // This has to be an object for the ngModel stuff to work, unfortunately.
      $scope.verification = {
        code: null,
        isInvalid: false
      };

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

      $scope.verifyCode = function() {
        // Ask the product suggestion entity if the entered code matches its code.
        if ($scope.suggestedProduct.codeIsValid($scope.verification.code)) {
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
          // Make them wait a couple of seconds before they can try again. It makes a brute force attack harder.
          // We have to use the angular timeout otherwise it doesn't notice when we reset the flag.
          // And of course we do this _after_ they close the window alert.
          $scope.verification.isInvalid = true;
          $timeout(
            function () {
              $scope.verification.isInvalid = false;
            },
            2000
          );
        }
      };
    }
  ]
);
