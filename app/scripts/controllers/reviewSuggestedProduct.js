'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:ReviewSuggestedProductCtrl
 * @description
 * # ReviewSuggestedProductCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('ReviewSuggestedProductCtrl', [
  '$scope',
  '$location',
  '$transition$',
  'dataRepositoryFactory',
  'ProductSuggestionStatuses',
  'MailerService',
  function ($scope, $location, $transition$, dataRepositoryFactory, ProductSuggestionStatuses, MailerService) {
    $scope.dataRepository = null;
    $scope.ProductSuggestionStatuses = ProductSuggestionStatuses;
    $scope.suggestedProductId = parseInt($transition$.params().id);
    $scope.category = null;
    $scope.brand = null;
    $scope.adminNotes = null;
    $scope.mailerService = MailerService;

    $scope.loaded = false;
    $scope.editingNotes = false;

    $scope.suggestedProduct = null;

    dataRepositoryFactory.ready(
      function () {
        $scope.dataRepository = dataRepositoryFactory.getDataRepository();
        $scope.suggestedProduct = $scope.dataRepository.getSuggestedProductById($scope.suggestedProductId);

        $scope.category = $scope.dataRepository.getCategoryById($scope.suggestedProduct.getCategoryId());
        $scope.brand = $scope.dataRepository.getBrandById($scope.suggestedProduct.getBrandId());

        $scope.persistService = new PersistService(
          dataRepositoryFactory,
          $scope.dataRepository,
          dataRepositoryFactory.getStorageRepository()
        );

        $scope.loaded = true;
      }
    );

    $scope.isValid = function isValid()
    {
      // Check that every field is populated.
      // @TODO: /scripts/controllers/formAdd.js has this list (or at least a similar one) - needs to be held centrally.
      return (
        $scope.suggestedProduct.getName() &&
        $scope.suggestedProduct.getDescription() &&
        $scope.suggestedProduct.getPurchaseUrl() &&
        $scope.suggestedProduct.getImage() &&
        $scope.suggestedProduct.getCategoryId() &&
        $scope.suggestedProduct.getBrandId()
      );
    };

    $scope.editNotes = function editNotes() {
      $scope.adminNotes = $scope.suggestedProduct.getAdminNotes();
      $scope.editingNotes = true;
    };

    $scope.closeEditNotes = function closeEditNotes() {
      $scope.adminNotes = null;
      $scope.editingNotes = false;
    };

    $scope.cancelEditNotes = function cancelEditNotes() {
      $scope.closeEditNotes();
    };

    $scope.saveNotes = function saveNotes(adminNotes) {
      $scope.suggestedProduct.setAdminNotes(adminNotes);
      $scope.dataRepository.persistProductSuggestion($scope.suggestedProduct, 'Your notes have been saved');

      // Tell the suggester we have edited the notes on their suggestion.
      $scope.mailerService.send(
        $scope.suggestedProduct.getSuggesterEmailAddress(),
        'We have added/amended the notes on your product suggestion',
        'We have added/amended the notes on your product suggestion ('+$location.absUrl()+').'
      );

      $scope.closeEditNotes();
    };

    $scope.reject = function reject() {
      if (!window.confirm('Are you sure you want to reject this product suggestion?')) {
        return;
      }

      $scope.suggestedProduct.setStatus($scope.ProductSuggestionStatuses.rejected);
      $scope.dataRepository.persistProductSuggestion($scope.suggestedProduct, 'This product suggestion has been rejected');

      // Tell the suggester we have rejected their suggestion.
      $scope.mailerService.send(
        $scope.suggestedProduct.getSuggesterEmailAddress(),
        'Your product suggestion has been rejected',
        'We are sorry but we have rejected your product suggestion ('+$location.absUrl()+').'
      );
    };

    $scope.unreject = function unreject() {
      if (!window.confirm('Are you sure you want to put this product suggestion back in to review?')) {
        return;
      }

      $scope.suggestedProduct.setStatus($scope.ProductSuggestionStatuses.inReview);
      $scope.dataRepository.persistProductSuggestion($scope.suggestedProduct, 'This product suggestion has been moved back to "in review"');

      // Tell the suggester we have unrejected their suggestion.
      $scope.mailerService.send(
        $scope.suggestedProduct.getSuggesterEmailAddress(),
        'Your product suggestion has been un-rejected',
        'We are pleased to tell you that we have reversed the rejection your product suggestion ('+$location.absUrl()+').'
      );
    };

    $scope.deleteSuggestion = function deleteSuggestion() {
      if (!window.confirm('Are you sure you want to permanently delete this product suggestion? This operation cannot be undone.')) {
        return;
      }

      $scope.dataRepository.deleteProductSuggestion(
        $scope.suggestedProduct,
        function () {
          window.alert('This product suggestion has been deleted');
          // We need to navigate back to the suggestions list page.
          $location.path('/admin/listSuggestedProducts');

        });
    };

    $scope.approve = function approve() {
      if (window.confirm('This will create a product from the details in the suggestion. Are you sure you want to continue?')) {
        // We need an instance of Product that contains all the common fields from the suggestion.
        // We can literally pass the ProductSuggestion entity into the Product constructor and get such a thing.
        // Then we just blank the id (which of course is the suggestion id) so that it inserts the product.
        var product = new Product($scope.suggestedProduct);
        product.setId(null);
        $scope.persistService.processProduct(
          product,
          'The product has been created!',
          function () {
            // The product has been generated.
            // Copy the new product id into the product suggestion, set its state to "approved" and save it.
            $scope.suggestedProduct.setGeneratedProductId(product.getId());
            $scope.suggestedProduct.setStatus($scope.ProductSuggestionStatuses.approved);
            $scope.persistService.processProductSuggestion(
              $scope.suggestedProduct,
              'The product has been linked to this suggestion',
              function () {
                // Tell the suggester we have approved their suggestion.
                $scope.mailerService.send(
                  $scope.suggestedProduct.getSuggesterEmailAddress(),
                  'Your product suggestion has been approved',
                  'We are pleased to tell you that we have approved your product suggestion ('+$location.absUrl()+').'
                );
              }
            );
          }
        );
      }
    };
  }
])
;
