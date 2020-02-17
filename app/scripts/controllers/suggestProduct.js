'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:SuggestProductCtrl
 * @description
 * # SuggestProductCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
  .controller('SuggestProductCtrl', [
    '$scope',
    '$state',
    '$location',
    'dataRepositoryFactory',
    function ($scope, $state, $location, dataRepositoryFactory) {
      $scope.loaded = false;
      $scope.success = false;
      $scope.errorMessages = [];

      // @TODO: This is a duplicate of the code in formAdd.js
      $scope.availableTypes = {
        Brands: 'brands',
        Categories: 'categories',
        Products: 'products'
      };

      $scope.formType = $scope.availableTypes.Products;
      // The new record has some product fields and some suggester fields.
      $scope.addItem = {
        name: null,
        description: null,
        purchaseUrl: null,
        image: null,
        suggesterGivenName: null,
        suggesterFamilyName: null,
        suggesterTelephoneNumber: null,
        suggesterEmailAddress: null,
        suggesterNotes: null
      };
      $scope.selectedCategoryId = null;
      $scope.selectedCategoryName = null;
      $scope.selectedBrandId = null;
      $scope.selectedBrandName = null;

      // @TODO: This is a duplicate of the one in formAdd.js - maybe put it in some kind of service?
      var alphabetizeCollection = function alphabetizeCollection(collection) {
        if (collection === undefined) {
          return [];
        }
        if (!Array.isArray(collection)) {
          return [collection];
        }
        collection.sort(function (a, b) {
          return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
        });
        return collection;
      };

      dataRepositoryFactory.ready(
        function () {
          var dataRepository = dataRepositoryFactory.getDataRepository();
          $scope.categories = alphabetizeCollection(dataRepository.getCategories().filter(Boolean));
          $scope.brands = alphabetizeCollection(dataRepository.getBrands());
          $scope.dataRepository = dataRepository;
          $scope.loaded = true;
        }
      );

      /**
       * @param category {Category}
       * @TODO: This is a duplicate of the method in formAdd.js
       */
      $scope.setCategory = function (category) {
        $scope.selectedCategoryId = category.getId();
        $scope.selectedCategoryName = category.getName();
      };

      /**
       * @param brand {Brand}
       * @TODO: This is a duplicate of the method in formAdd.js
       */
      $scope.setBrand = function (brand) {
        $scope.selectedBrandId = brand.getId();
        $scope.selectedBrandName = brand.getName();
      };

      /**
       * Validate the entries.
       * Note: the validation is subject to change.
       *
       * @param item
       *
       * @return {string[]}
       */
      $scope.validInput = function validInput(item) {
        var result = [];

        // Product name must be entered.
        if (item.name === null || item.name === '' || item.name === undefined) {
          result.push('Product name must be entered');
        }

        // Suggester given name and family name must be entered.
        var givenNameMissing = (item.suggesterGivenName === null || item.suggesterGivenName === '' || item.suggesterGivenName === undefined);
        var familyNameMissing = (item.suggesterFamilyName === null || item.suggesterFamilyName === '' || item.suggesterFamilyName === undefined);
        if (givenNameMissing || familyNameMissing) {
          var messageParts = [];
          if (givenNameMissing) {
            messageParts.push('given name ');
          }
          if (familyNameMissing) {
            messageParts.push('family name ');
          }
          result.push('Your '+(messageParts.join('and '))+' must be entered');
        }

        // Suggester telephone number or email address must be entered.
        if (
          (item.suggesterTelephoneNumber === null || item.suggesterTelephoneNumber === '' || item.suggesterTelephoneNumber === undefined) &&
          (item.suggesterEmailAddress === null || item.suggesterEmailAddress === '')
          ) {
          result.push('You must enter either a telephone number or an email address');
        }

        if (item.suggesterEmailAddress === undefined) {
          // We have told Angular that the input field is an email address. If the address is entered and is
          // not valid, it comes through as "undefined".
          result.push('Email address is not valid');
        }

        return result;
      };

      $scope.processForm = function (item) {
        // Populate the ids.
        item.categoryId = $scope.selectedCategoryId ? $scope.selectedCategoryId.toString() : null;
        item.brandId = $scope.selectedBrandId ? $scope.selectedBrandId.toString() : null;

        // Instantiate a model.
        var model = new ProductSuggestion(item);

        // Validate the entries.
        $scope.errorMessages = $scope.validInput(item);
        if ($scope.errorMessages.length === 0) {
          var persistService = new PersistService(
            dataRepositoryFactory,
            $scope.dataRepository,
            dataRepositoryFactory.getStorageRepository()
          );
          var onCompletion = function onCompletion() {
            $scope.loaded = false;
            $scope.success = true;

            // We need the rowid, but it's not populated on save, so we have to get the storage repository
            // to reparse the records, and then we need to ask for the model by id.
            $scope.dataRepository.parse($scope.dataRepository.getCollectionNames().productSuggestions);
            var suggestedProduct = $scope.dataRepository.getSuggestedProductById(model.getId());

            // Build a URL that the suggester can bookmark. It needs to take into account the host, protocol, etc.
            // There must be a better way of doing this (I couldn't find one).
            var pathParts = $location.absUrl().split('#!');
            $scope.suggestionUrl = pathParts[0]+'#!/viewSuggestedProduct/'+suggestedProduct.getRowid();
          };

          persistService.processProductSuggestion(model, null, onCompletion);
        }
      };

      $scope.reloadPage = function () {
        // This reloads the page (controller) and the data (not that any is visible) without reloading the entire app.
        $state.reload();
      };

    }]);
