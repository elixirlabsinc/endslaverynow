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
    'dataRepositoryFactory',
    function ($scope, $state, dataRepositoryFactory) {
      $scope.loaded = false;
      $scope.success = false;

      // @TODO: This is a duplicate of the code in formAdd.js
      $scope.availableTypes = {
        Brands: 'brands',
        Categories: 'categories',
        Products: 'products'
      };

      $scope.formType = $scope.availableTypes.Products;
      $scope.addItem = {
        name: null,
        description: null,
        purchaseUrl: null,
        image: null
      };
      $scope.selectedCategoryId = null;
      $scope.selectedCategoryName = null;
      $scope.selectedBrandId = null;
      $scope.selectedBrandName = null;
      $scope.suggester = {
        name: null,
        telephoneNumber: null,
        emailAddress: null,
        notes: null
      };

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

      $scope.processForm = function (item, suggester) {
        // @TODO: Process the form - validate the entries, save the product and the suggester details.
        // @TODO: Populate the hidden fields in the suggester - status, submitted timestamp.


        $scope.loaded = false;
        $scope.success = true;
      };

      $scope.reloadPage = function () {
        // This reloads the page (controller) and the data (not that any is visible) without reloading the entire app.
        $state.reload();
      };

    }]);
