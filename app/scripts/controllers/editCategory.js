'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditCategoryCtrl
 * @description
 * # EditCategoryCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditCategoryCtrl', [
  '$transition$',
  '$scope',
  '$state',
  'dataRepositoryFactory',
  function ($transition$, $scope, $state, dataRepositoryFactory) {
    $scope.categoryId = $transition$.params().id;

    $scope.dataRepository = null;

    $scope.categories = [];

    $scope.NameValue = null;
    $scope.DescriptionValue = null;
    $scope.selectedParentCategoryId = null;
    $scope.Image = null;

    dataRepositoryFactory.ready(
      $scope,
      function () {
        $scope.dataRepository = dataRepositoryFactory.getDataRepository();

        $scope.categories = $scope.dataRepository.getCategories();

        // Set up the individual field values.
        /**
         * @var {Category} category
         */
        var category = $scope.dataRepository.getCategoryById($scope.categoryId);
        $scope.name = category.getName();
        $scope.description = category.getDescription();
        $scope.parentCategory = $scope.dataRepository.getCategoryById(category.getParentCategoryId());
        $scope.image = category.getImage();

        /**
         * @param category {Category|null}
         */
        $scope.setParentCategory = function (category) {
          $scope.selectedParentCategoryId = category ? category.getId() : null;
          $scope.selectedParentCategoryName = category ? category.getName() : null;
        };

        $scope.removeParentCategory = function () {
          $scope.parentCategory = null;
          $scope.setParentCategory(null);
        };
      }
    );

    $scope.processForm = function () {
      // Start with the original category object, and overwrite any values with values the user has changed.
      /**
       * @var {Category} category
       */
      var category = $scope.dataRepository.getCategoryById($scope.categoryId);
      if ($scope.NameValue) {
        category.setName($scope.NameValue);
      }
      if ($scope.DescriptionValue) {
        category.setDescription($scope.DescriptionValue);
      }
      if ($scope.selectedParentCategoryId) {
        category.setParentCategoryId($scope.selectedParentCategoryId);
      } else {
        category.setParentCategoryId(null);
      }
      if ($scope.Image) {
        category.setImage($scope.Image);
      }

      var persistService = new PersistService(
        dataRepositoryFactory,
        $scope.dataRepository,
        dataRepositoryFactory.getStorageRepository()
      );
      persistService.processCategory(
        category,
        'Edit has been completed!',
        function () {
          $state.go('admin.editCategories');
        }
      );
    };
  }
]);
