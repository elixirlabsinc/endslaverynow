'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditCategoriesCtrl
 * @description
 * # EditCategoriesCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditCategoriesCtrl', [
  '$scope',
  '$window',
  'dataRepositoryFactory',
  function ($scope, $window, dataRepositoryFactory) {
    $scope.dataRepository = null;

    $scope.loaded = false;

    $scope.categories = [];

    dataRepositoryFactory.ready(
      function () {
        $scope.dataRepository = dataRepositoryFactory.getDataRepository();
        $scope.categories = $scope.dataRepository.getCategories();

        $scope.loaded = true;
      }
    );

    /**
     * @param {Category} category
     */
    $scope.deleteCategory = function (category) {
      var prompt = "Are you sure you want to delete category '" + category.getName() + "'?";
      if (!window.confirm(prompt)) {
        return;
      }
      $scope.dataRepository.deleteCategory(
        category,
        function () {
          // @TODO: We need to find a more efficient/nicer way of refreshing the list of brands.
          $window.location.reload();
        }
      );
    };
  }
]);
