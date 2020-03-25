'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditSuggestedProductCtrl
 * @description
 * # EditSuggestedProductCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditSuggestedProductCtrl', [
  '$scope',
  '$transition$',
  '$state',
  '$location',
  'dataRepositoryFactory',
  'EmailHelperService',
  'LookupService',
  function ($scope, $transition$, $state, $location, dataRepositoryFactory, EmailHelperService, LookupService) {
    $scope.lookupService = LookupService;
    $scope.loaded = false;
    $scope.suggestedProductId = parseInt($transition$.params().id);
    $scope.emailHelperService = EmailHelperService;

    // @TODO: We need to change the way this works so that the form only uses models (and not ng-values)
    // @TODO: so that we can tell when someone blanks out a field.
    // We have to put these models in an object because the view includes a sub-view and it just doesn't
    // work otherwise.
    $scope.entity = {
      NameValue: null,
      DescriptionValue: null,
      PurchaseURLValue: null,
      selectedBrandId: null,
      Image: null,
      suggesterGivenNameValue: null,
      suggesterFamilyNameValue: null,
      suggesterTelephoneNumberValue: null,
      suggesterEmailAddressValue: null
    };
    $scope.selectedBrandId = null;
    $scope.lookupService.reset();

    $scope.ctrl = {
      brands: null,
      categories: null
    };

    dataRepositoryFactory.ready(
      function () {
        $scope.dataRepository = dataRepositoryFactory.getDataRepository();

        // The brands and categories have to be in an object because of the way the view works.
        $scope.ctrl = {
          brands: $scope.dataRepository.getBrands(),
          categories: $scope.dataRepository.getCategories()
        };
        $scope.products = $scope.dataRepository.getProducts();

        // Set up the individual field values.
        /**
         * @var {ProductSuggestion} suggestedProduct
         */
        var suggestedProduct = $scope.dataRepository.getSuggestedProductById($scope.suggestedProductId);
        $scope.name = suggestedProduct.getName();
        $scope.description = suggestedProduct.getDescription();
        $scope.purchaseURL = suggestedProduct.getPurchaseUrl();
        // $scope.ranking = suggestedProduct.getRanking();
        $scope.image = suggestedProduct.getImage();
        $scope.CategoryId = suggestedProduct.getCategoryId();
        $scope.BrandId = suggestedProduct.getBrandId();

        $scope.brand = $scope.dataRepository.getBrandById($scope.BrandId);
        $scope.cat = $scope.dataRepository.getCategoryById($scope.CategoryId);

        $scope.suggesterGivenName = suggestedProduct.getSuggesterGivenName();
        $scope.suggesterFamilyName = suggestedProduct.getSuggesterFamilyName();
        $scope.suggesterTelephoneNumber = suggestedProduct.getSuggesterTelephoneNumber();
        $scope.suggesterEmailAddress = suggestedProduct.getSuggesterEmailAddress();

        $scope.suggesterWhy = suggestedProduct.getSuggesterWhy();
        $scope.suggesterNotes = suggestedProduct.getSuggesterNotes();
        $scope.createdAtUtc = suggestedProduct.getCreatedAtUtc();
        $scope.adminNotes = suggestedProduct.getAdminNotes();

        $scope.loaded = true;

        /**
         * @param brand {Brand}
         */
        $scope.setBrand = function (brand) {
          $scope.entity.selectedBrandId = brand.getId();
          $scope.selectedBrandName = brand.getName();
        };

        $scope.persistService = new PersistService(
          dataRepositoryFactory,
          $scope.dataRepository,
          dataRepositoryFactory.getStorageRepository()
        );

        $scope.loaded = true;
      }
    );

    /**
     * @param {ProductSuggestion} productSuggestion
     * @param entity
     *
     * @return {Array}
     */
    $scope.validInput = function (productSuggestion, entity) {
      var result = [];
      if (entity.suggesterEmailAddressValue === undefined) {
        result.push('Suggester email address is not valid');
      }
      // @TODO: This doesn't work because if the user blanks out a field, it doesn't get blanked in the model.
      if (productSuggestion.getSuggesterTelephoneNumber() === null &&
          productSuggestion.getSuggesterEmailAddress() === null) {
        result.push('Suggester must have a telephone number or an email address');
      }

      return result;
    };

    $scope.processForm = function () {
      // Start with the original product suggestion object, and overwrite any values with values the user
      // has changed.
      /**
       * @var {ProductSuggestion} productSuggestion
       */
      var productSuggestion = $scope.dataRepository.getSuggestedProductById($scope.suggestedProductId);
      // Product-related fields.
      if ($scope.entity.NameValue) {
        productSuggestion.setName($scope.entity.NameValue);
      }
      if ($scope.entity.DescriptionValue) {
        productSuggestion.setDescription($scope.entity.DescriptionValue);
      }
      if ($scope.entity.PurchaseURLValue) {
        productSuggestion.setPurchaseUrl($scope.entity.PurchaseURLValue);
      }
      if ($scope.lookupService.getSelectedCategoryId()) {
        productSuggestion.setCategoryId($scope.lookupService.getSelectedCategoryId());
      }
      if ($scope.entity.selectedBrandId) {
        productSuggestion.setBrandId($scope.entity.selectedBrandId);
      }
      if ($scope.entity.Image) {
        productSuggestion.setImage(dataRepositoryFactory.getStorageRepository().extractLatestImage($scope.entity.Image));
      }

      // Suggester-related fields
      if ($scope.entity.suggesterGivenNameValue) {
        productSuggestion.setSuggesterGivenName($scope.entity.suggesterGivenNameValue);
      }
      if ($scope.entity.suggesterFamilyNameValue) {
        productSuggestion.setSuggesterFamilyName($scope.entity.suggesterFamilyNameValue);
      }
      if ($scope.entity.suggesterTelephoneNumberValue) {
        productSuggestion.setSuggesterTelephoneNumber($scope.entity.suggesterTelephoneNumberValue);
      }
      if ($scope.entity.suggesterEmailAddressValue) {
        productSuggestion.setSuggesterEmailAddress($scope.entity.suggesterEmailAddressValue);
      }

      // Validate the entries.
      $scope.errorMessages = $scope.validInput(productSuggestion, $scope.entity);
      if ($scope.errorMessages.length === 0) {
        var self = $scope;
        $scope.persistService.processProductSuggestion(
          productSuggestion,
          'Edit has been completed!',
          function () {
            // Tell the suggester we have edited their suggestion.
            self.emailHelperService.afterEdit(productSuggestion);

            $state.go('admin.reviewSuggestedProduct', {id: $scope.suggestedProductId});
          }
        );
      }
    };
  }
])
;
