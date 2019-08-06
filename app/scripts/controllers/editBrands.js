'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditBrandsCtrl
 * @description
 * # EditBrandsCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditBrandsCtrl', [
  '$scope',
  '$window',
  'dataRepositoryFactory',
  function ($scope, $window, dataRepositoryFactory) {
    $scope.loaded = false;
    $scope.dataRepository = null;

    $scope.brands = [];

    dataRepositoryFactory.ready(
      function () {
        $scope.dataRepository = dataRepositoryFactory.getDataRepository();
        $scope.brands = $scope.dataRepository.getBrands();

        $scope.loaded = true;
      }
    );

    /**
     * @param {Brand} brand
     */
    $scope.deleteBrand = function (brand) {
      var prompt = "Are you sure you want to delete brand '" + brand.getName() + "'?";
      if (!window.confirm(prompt)) {
        return;
      }
      $scope.dataRepository.deleteBrand(
        brand,
        function () {
          // @TODO: We need to find a more efficient/nicer way of refreshing the list of brands.
          $window.location.reload();
        }
      );
    };
  }
]);
