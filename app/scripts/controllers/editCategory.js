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
  'LookupService',
  function ($transition$, $scope, $state, dataRepositoryFactory, LookupService) {
    $scope.categoryId = $transition$.params().id;
    $scope.lookupService = LookupService;

    $scope.dataRepository = null;

    $scope.categories = [];

    $scope.NameValue = null;
    $scope.DescriptionValue = null;
    $scope.Image = null;

    dataRepositoryFactory.ready(
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

        $scope.removeParentCategory = function () {
          $scope.parentCategory = null;
          $scope.lookupService.setParentCategory(null);
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
      if ($scope.lookupService.getSelectedParentCategoryId()) {
        category.setParentCategoryId($scope.lookupService.getSelectedParentCategoryId());
      } else {
        category.setParentCategoryId(null);
      }
      if ($scope.Image) {
        category.setImage(dataRepositoryFactory.getStorageRepository().extractLatestImage($scope.Image));
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
