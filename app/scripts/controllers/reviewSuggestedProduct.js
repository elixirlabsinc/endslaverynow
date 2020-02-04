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

        $scope.loaded = true;
      }
    );
  }
])
;
