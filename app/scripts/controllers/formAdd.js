'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:FormAddCtrl
 * @description
 * # FormAddCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
  .controller('FormAddCtrl',[
    '$stateParams',
    '$scope',
    '$window',
    'Upload',
    'dataRepositoryFactory',
    function ($stateParams, $scope, $window, Upload, dataRepositoryFactory) {
      $scope.brandId = $stateParams.id;
      $scope.loaded = false;

      $scope.formType = '';
      $scope.errorMessage = false;

        $scope.availableTypes ={
	        Brands: 'brands',
	        Categories: 'categories',
	        Products: 'products'
        };

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

      $scope.selectedBrandId = null;
      $scope.selectedBrandName = null;
      $scope.selectedCategoryId = null;
      $scope.selectedCategoryName = null;
      $scope.selectedParentCategoryId = null;
      $scope.selectedParentCategoryName = null;
      $scope.selectedRankName = null;

      $scope.products = [];
      $scope.dataRepository = null;

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
        $scope,
        function() {
          var dataRepository = dataRepositoryFactory.getDataRepository();
          $scope.categories = alphabetizeCollection(dataRepository.getCategories().filter(Boolean));
          $scope.brands = alphabetizeCollection(dataRepository.getBrands());
          $scope.products = dataRepository.getProducts();
          $scope.dataRepository = dataRepository;
          $scope.loaded = true;
        }
      );

	    var validInput = function validInput(item, requiredInputs) {
		    var isValid = !!item;

		    for(var req in requiredInputs) {
			    if (requiredInputs[req] && !item[req]) {
				    isValid = false;
			    }
		    }

		    return isValid;
	    };

	    function prependHttp(url) {
		    if(/^(http)/.test(url)) {
			    return url;
		    } else {
			    return 'http://' + url;
		    }
	    }

	    $scope.processForm = function(item) {
            $scope.errorMessage = false;
            if(!item) {
              $scope.errorMessage = true;
              return;
            }

            var model = null;
            switch ($scope.formType) {
              case $scope.availableTypes.Brands:
	              item.categories = $scope.selectedCategoryId.toString();
	              item.ranking = $scope.selectedRankName;
	              model = new Brand(item);
                  break;
	          case $scope.availableTypes.Categories:
		          item.parentCategoryId = $scope.selectedParentCategoryId || 0;
		          model = new Category(item);
		          break;
	          case $scope.availableTypes.Products:
		          item.brandId = $scope.selectedBrandId;
		          item.categoryId = $scope.selectedCategoryId;
		          item.purchaseUrl = prependHttp(item.purchaseUrl);
		          item.purchaseURlClicks = 0;
		          item.parentCategoryId = 0;
		          model = new Product(item);
		          break;
          }

        if (!validInput(item, itemTypes[$scope.formType].requiredInputs)) {
          $scope.errorMessage = true;
        } else {
            var onCompletion = function onCompletion() {
	            var addForm = document.getElementById('add-form');
	            addForm.style.display = 'none';
	            var successMessage = document.getElementById('submitted-form');
	            successMessage.style.display = 'block';
            };
            var doPersist = function doPersist() {
	            switch ($scope.formType) {
		            case $scope.availableTypes.Brands:
			            $scope.dataRepository.persistBrand(model, null, onCompletion);
			            break;
		            case $scope.availableTypes.Categories:
			            $scope.dataRepository.persistCategory(model, null, onCompletion);
			            break;
		            case $scope.availableTypes.Products:
			            $scope.dataRepository.persistProduct(model, null, onCompletion);
			            break;
	            }
            };
            var persistService = new PersistService(
	            dataRepositoryFactory,
	            $scope.dataRepository,
	            dataRepositoryFactory.getStorageRepository()
            );
	        switch ($scope.formType) {
		        case $scope.availableTypes.Brands:
			        persistService.processBrand(model, null, doPersist);
			        break;
		        case $scope.availableTypes.Categories:
			        persistService.processCategory(model, null, doPersist);
			        break;
		        case $scope.availableTypes.Products:
			        persistService.processProduct(model, null, doPersist);
			        break;
	        }
        }
      };

      /**
       * @param category {Category}
       */
      $scope.setCategory = function(category) {
        $scope.selectedCategoryId = category.getId();
        $scope.selectedCategoryName = category.getName();
      };

      /**
       * @param category {Category}
       */
      $scope.setParentCategory = function(category) {
        $scope.selectedParentCategoryId = category.getId();
        $scope.selectedParentCategoryName = category.getName();
      };

      /**
       * @param brand {Brand}
       */
      $scope.setBrand = function(brand) {
        $scope.selectedBrandId = brand.getId();
        $scope.selectedBrandName = brand.getName();
      };

      $scope.setRanking = function(rank) {
        $scope.selectedRankName = rank;
      };

      $scope.selectItemType = function(itemType) {
        $scope.itemType = itemType ? itemTypes[itemType].name : '';
        $scope.formType = itemType;
      };

      $scope.reloadPage = function() {
        $window.location.reload();
      };
}]);
