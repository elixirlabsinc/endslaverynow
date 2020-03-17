'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:SuggestedProductSendMessageCtrl
 * @description
 * # SuggestedProductSendMessageCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
  .controller('SuggestedProductSendMessageCtrl', [
    '$scope',
    '$transition$',
    'dataRepositoryFactory',
    function ($scope, $transition$, dataRepositoryFactory) {
      $scope.suggestedProductRowid = $transition$.params().rowid;
      $scope.loaded = false;
      $scope.found = false;
      $scope.valid = true;

      $scope.message = {
        subject: 'New message',
        body: ''
      };

      dataRepositoryFactory.ready(
        function () {
          var dataRepository = dataRepositoryFactory.getDataRepository();
          $scope.suggestedProduct = dataRepository.getSuggestedProductByRowid($scope.suggestedProductRowid);

          $scope.loaded = true; // Data repository has all the data.

          if ($scope.suggestedProduct === null) {
            return;
          }

          $scope.found = true;
          $scope.message.subject = 'New message about '+$scope.suggestedProduct.getName();
        }
      );

      $scope.sendMessage = function sendMessage() {
        $scope.valid = $scope.message.subject && $scope.message.body;
        if (!$scope.valid) {
          return;
        }

        // Send the email now.
      };
    }
  ]
);
