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
    'AvailableTypes',
    'ProductSuggestionStatuses',
    'CollectionService',
    'EmailHelperService',
    'UrlHelperService',
    'ENV',
    'LookupService',
    function (
      $scope,
      $state,
      $location,
      dataRepositoryFactory,
      AvailableTypes,
      ProductSuggestionStatuses,
      CollectionService,
      EmailHelperService,
      UrlHelperService,
      ENV,
      LookupService
    ) {
      $scope.ProductSuggestionStatuses = ProductSuggestionStatuses;
      $scope.collectionService = CollectionService;
      $scope.emailHelperService = EmailHelperService;
      $scope.urlHelperService = UrlHelperService;
      $scope.lookupService = LookupService;
      $scope.availableTypes = AvailableTypes;
      $scope.loaded = false;
      $scope.errorMessages = [];

      // Initialise the recaptcha form, and hide our submit button until the user completes the challenge.
      $scope.vcRecaptureSiteKey = ENV.grecaptcha.sitekey;
      $scope.showSubmitButton = false;

      $scope.formType = $scope.availableTypes.Products;
      $scope.formPurpose = 'product suggestion';
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
        suggesterWhy: null,
        suggesterNotes: null
      };
      $scope.lookupService.reset();

      dataRepositoryFactory.ready(
        function () {
          var dataRepository = dataRepositoryFactory.getDataRepository();
          $scope.categories = $scope.collectionService.alphabetize(dataRepository.getCategories().filter(Boolean));
          $scope.brands = $scope.collectionService.alphabetize(dataRepository.getBrands());
          $scope.dataRepository = dataRepository;
          $scope.loaded = true;
        }
      );

      // Callback functions that get called when the recaptcha challenge is completed, and when that
      // completion times out.
      $scope.vcRecaptureOnSuccess = function vcRecaptureOnSuccess(response) {
        // User successfully completed the recapture challenge - allow them to submit the form.
        $scope.showSubmitButton = true;
      };
      $scope.vcRecaptureOnExpire = function vcRecaptureOnExpire() {
        // User successfully completed the recapture challenge, but it has since expired - do not allow
        // them to submit the form.
        $scope.showSubmitButton = false;
      };

      $scope.hasImage = function hasImage(image) {
        return Array.isArray(image) && image.length > 0;
      };

      $scope.removeImage = function removeImage() {
        if (window.confirm('Are you sure you want to remove this image?')) {
          $scope.addItem.image = null;
        }
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

        // Just make sure they are allowed to submit the form (in case anyone has hacked the DOM).
        if (!$scope.showSubmitButton) {
          result.push('Please complete the reCaptcha before submitting the form!');
        }

        // Product name must be entered.
        if (item.name === null || item.name === '' || item.name === undefined) {
          result.push('Product name must be entered');
        }

        // Any image must be a JPEG and less than 2MB. I know the image form form can validate this, but
        // any file that fails the constraints is just ignored, and it's impossible for this controller to
        // know when that happens. So, the form field allows everything, and we test it here.
        if ($scope.hasImage(item.image)) {
          var currentImage = item.image[item.image.length-1];
          if (currentImage.type !== 'image/png') {
            result.push('Product image must be a png');
          }
          if (currentImage.size > 2000000) {
            result.push('Maximum product image size is 2MB');
          }
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

        // The reason why they think this is a slave-free product must be entered.
        if (item.suggesterWhy === null || item.suggesterWhy === '' || item.suggesterWhy === undefined) {
          result.push('You must tell us why you think this is a slave-free product');
        }

        return result;
      };

      $scope.processForm = function (item) {
        // Populate the ids.
        item.categoryId = $scope.lookupService.getSelectedCategoryIdAsString();
        item.brandId = $scope.lookupService.getSelectedBrandIdAsString();

        // Instantiate a model.
        var model = new ProductSuggestion(item);

        // Validate the entries.
        $scope.errorMessages = $scope.validInput(item);
        if ($scope.errorMessages.length === 0) {
          if (item.image) {
            model.setImage(dataRepositoryFactory.getStorageRepository().extractLatestImage(item.image));
          }
          // @TODO: For now, skip the "validation code" step and move the status on to "in review" (it would normally be "pending").
          model.setStatus($scope.ProductSuggestionStatuses.inReview);

          var persistService = new PersistService(
            dataRepositoryFactory,
            $scope.dataRepository,
            dataRepositoryFactory.getStorageRepository()
          );
          var onCompletion = function onCompletion() {
            // @TODO: At this point, we need to send a code to either the telephone number or email address.
            // @TODO: I imagine we'd have to put some kind of identifier in the record (maybe before save, or here).

            // We need the rowid, but it's not populated on save, so we have to get the storage repository
            // to reparse the records, and then we need to ask for the model by id.
            $scope.dataRepository.parse($scope.dataRepository.getCollectionNames().productSuggestions);
            var suggestedProduct = $scope.dataRepository.getSuggestedProductById(model.getId());

            // Redirect the user to the "view" screen for this product. It will include, amongst other things,
            // a field to enter the validation code in.
            $location.path($scope.urlHelperService.getPathForSuggestedProduct(suggestedProduct));

            $scope.emailHelperService.afterCreation(suggestedProduct);
          };

          persistService.processProductSuggestion(model, null, onCompletion);
        }
      };

      $scope.reloadPage = function () {
        // This reloads the page (controller) and the data (not that any is visible) without reloading the entire app.
        $state.reload();
      };

    }]);
