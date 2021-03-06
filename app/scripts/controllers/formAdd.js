'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:FormAddCtrl
 * @description
 * # FormAddCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
  .controller('FormAddCtrl', [
    '$stateParams',
    '$scope',
    '$state',
    'Upload',
    'dataRepositoryFactory',
    'AvailableTypes',
    'CollectionService',
    'LookupService',
    function ($stateParams, $scope, $state, Upload, dataRepositoryFactory, AvailableTypes, CollectionService, LookupService) {
      $scope.availableTypes = AvailableTypes;
      $scope.collectionService = CollectionService;
      $scope.lookupService = LookupService;
      $scope.brandId = $stateParams.id;
      $scope.loaded = false;

      $scope.formType = '';
      $scope.formPurpose = 'item add';
      $scope.errorMessage = false;

      var itemTypes = {
        'categories': {
          name: 'Category',
          requiredInputs: {
            name: true,
            description: true,
            purchaseUrl: false,
            image: true,
            category: false,
            categories: false,
            brand: false,
            ranking: false,
            parentCategoryId: false
          }
        },
        'brands': {
          name: 'Brand',
          requiredInputs: {
            name: true,
            description: true,
            purchaseUrl: false,
            image: true,
            category: false,
            categories: true,
            brand: false,
            ranking: true
          }
        },
        'products': {
          name: 'Product',
          requiredInputs: {
            name: true,
            description: true,
            purchaseUrl: true,
            image: true,
            categoryId: true,
            brandId: true,
            ranking: false,
            parentCategoryId: false
          }
        }
      };

      $scope.rankingOptions = (new Ranking()).getRankingOptions();

      $scope.addItem = {
        name: null,
        description: null,
        purchaseUrl: null,
        image: null
      };

      $scope.lookupService.reset();

      $scope.products = [];
      $scope.dataRepository = null;

      dataRepositoryFactory.ready(
        function () {
          var dataRepository = dataRepositoryFactory.getDataRepository();
          $scope.categories = $scope.collectionService.alphabetize(dataRepository.getCategories().filter(Boolean));
          $scope.brands = $scope.collectionService.alphabetize(dataRepository.getBrands());
          $scope.products = dataRepository.getProducts();
          $scope.dataRepository = dataRepository;
          $scope.loaded = true;
        }
      );

      var validInput = function validInput(item, requiredInputs) {
        var isValid = !!item;

        for (var req in requiredInputs) {
          if (requiredInputs[req] && !item[req]) {
            isValid = false;
          }
        }

        return isValid;
      };

      function prependHttp(url) {
        if (/^(http)/.test(url)) {
          return url;
        } else {
          return 'http://' + url;
        }
      }

      $scope.processForm = function (item) {
        $scope.errorMessage = false;
        if (!item) {
          $scope.errorMessage = true;
          return;
        }

        var model = null;
        switch ($scope.formType) {
          case $scope.availableTypes.Brands:
            item.categories = $scope.lookupService.getSelectedCategoryIdAsString();
            item.ranking = $scope.lookupService.getSelectedRankName();
            model = new Brand(item);
            break;
          case $scope.availableTypes.Categories:
            item.parentCategoryId = $scope.lookupService.getSelectedParentCategoryId() || 0;
            model = new Category(item);
            break;
          case $scope.availableTypes.Products:
            item.brandId = $scope.lookupService.getSelectedBrandId();
            item.categoryId = $scope.lookupService.getSelectedCategoryId();
            item.purchaseUrl = prependHttp(item.purchaseUrl);
            item.purchaseURlClicks = 0;
            item.parentCategoryId = 0;
            model = new Product(item);
            break;
        }

        if (!validInput(item, itemTypes[$scope.formType].requiredInputs)) {
          $scope.errorMessage = true;
        } else {
          var persistService = new PersistService(
            dataRepositoryFactory,
            $scope.dataRepository,
            dataRepositoryFactory.getStorageRepository()
          );
          var onCompletion = function onCompletion() {
            var addForm = document.getElementById('add-form');
            addForm.style.display = 'none';
            var successMessage = document.getElementById('submitted-form');
            successMessage.style.display = 'block';
          };
          switch ($scope.formType) {
            case $scope.availableTypes.Brands:
              persistService.processBrand(model, null, onCompletion);
              break;
            case $scope.availableTypes.Categories:
              persistService.processCategory(model, null, onCompletion);
              break;
            case $scope.availableTypes.Products:
              persistService.processProduct(model, null, onCompletion);
              break;
          }
        }
      };

      $scope.selectItemType = function (itemType) {
        $scope.itemType = itemType ? itemTypes[itemType].name : '';
        $scope.formType = itemType;
      };

      $scope.reloadPage = function () {
        // This reloads the page (controller) and the data (not that any is visible) without reloading the entire app.
        $state.reload();
      };
    }]);
