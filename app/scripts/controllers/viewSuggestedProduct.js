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
    'dataRepositoryFactory',
    function ($transition$, $scope, dataRepositoryFactory) {
      $scope.suggestedProductRowid = $transition$.params().rowid;
      $scope.loaded = false;
      $scope.found = false;

      $scope.category = null;
      $scope.brand = null;

      dataRepositoryFactory.ready(
        function () {
          var dataRepository = dataRepositoryFactory.getDataRepository();
          $scope.suggestedProductDetails = dataRepository.getSuggestedProductByRowid($scope.suggestedProductRowid);

          $scope.loaded = true; // Data repository has all the data.

          if ($scope.suggestedProductDetails === null) {
            return;
          }

          if ($scope.suggestedProductDetails.getCategoryId()) {
            $scope.category = dataRepository.getCategoryById($scope.suggestedProductDetails.getCategoryId());
          }

          if ($scope.suggestedProductDetails.getBrandId()) {
            $scope.brand = dataRepository.getBrandById($scope.suggestedProductDetails.getBrandId());
          }

          $scope.found = true; // The rowid was valid, and we retrieved the record.
        }
      );
    }
  ]
);
