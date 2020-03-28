'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditBrandCtrl
 * @description
 * # EditCategoryCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditBrandCtrl', [
  '$transition$',
  '$scope',
  '$state',
  'dataRepositoryFactory',
  'LookupService',
  function ($transition$, $scope, $state, dataRepositoryFactory, LookupService) {
    $scope.lookupService = LookupService;
    $scope.brandId = $transition$.params().id;

    $scope.dataRepository = null;

    // FIXME: I don't think brands and products are used, but check before removing.
    $scope.brands = [];
    $scope.categories = [];
    $scope.products = [];

    $scope.NameValue = null;
    $scope.DescriptionValue = null;
    $scope.lookupService.reset();
    $scope.Image = null;

    dataRepositoryFactory.ready(
      function () {
        $scope.dataRepository = dataRepositoryFactory.getDataRepository();

        $scope.brands = $scope.dataRepository.getBrands();
        $scope.categories = $scope.dataRepository.getCategories();
        $scope.products = $scope.dataRepository.getProducts();

        // Set up the individual field values.
        /**
         * @var {Brand} brand
         */
        var brand = $scope.dataRepository.getBrandById($scope.brandId);
        $scope.name = brand.getName();
        $scope.description = brand.getDescription();
        $scope.ranking = brand.getRanking();
        $scope.image = brand.getImage();
        $scope.rankingOptions = (new Ranking()).getRankingOptions(); // Ideally needs to be a static method.
        // @TODO: If $scope.CategoryId is not used anywhere else, it should just be a local variable.
        $scope.CategoryId = brand.getFirstCategoryId();
        $scope.cat = $scope.CategoryId === null ? null : $scope.dataRepository.getCategoryById($scope.CategoryId);

        $scope.loaded = true;
      }
    );

    $scope.processForm = function () {
      // Start with the original brand object, and overwrite any values with values the user has changed.
      /**
       * @var {Brand} brand
       */
      var brand = $scope.dataRepository.getBrandById($scope.brandId);
      if ($scope.NameValue) {
        brand.setName($scope.NameValue);
      }
      if ($scope.DescriptionValue) {
        brand.setDescription($scope.DescriptionValue);
      }
      if ($scope.lookupService.getSelectedRankName()) {
        brand.setRanking($scope.lookupService.getSelectedRankName());
      }
      if ($scope.lookupService.getSelectedCategoryId()) {
        brand.setCategoryIds([$scope.lookupService.getSelectedCategoryId()]); // We need to pass in an array of category ids.
      }
      if ($scope.Image) {
        brand.setImage(dataRepositoryFactory.getStorageRepository().extractLatestImage($scope.Image));
      }

      var persistService = new PersistService(
        dataRepositoryFactory,
        $scope.dataRepository,
        dataRepositoryFactory.getStorageRepository()
      );
      persistService.processBrand(
        brand,
        'Edit has been completed!',
        function () {
          $state.go('admin.editBrands');
        }
      );
    };
  }
]);
