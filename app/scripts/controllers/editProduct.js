'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditProductCtrl
 * @description
 * # EditCategoryCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditProductCtrl', [
	'$firebaseObject', // @TODO: This can be removed once the image stuff is done
	'$stateParams',
	'$scope',
	'$state',
	'dataRepositoryFactory',
	function($firebaseObject, $stateParams, $scope, $state, dataRepositoryFactory) {
		$scope.productId = $stateParams.id;

		$scope.dataRepository = null;

		dataRepositoryFactory.ready(
			$scope,
			function(dataRepository) {
				$scope.dataRepository = dataRepository;

				$scope.brands = dataRepository.getBrands();
				$scope.categories = dataRepository.getCategories();
				$scope.products = dataRepository.getProducts();

				// Set up the individual field values.
				/**
				 * @var {Product} product
				 */
				var product = dataRepository.getProductById($scope.productId);
				$scope.name = product.getName();
				$scope.description = product.getDescription();
				$scope.ranking = product.getRanking();
				$scope.image = product.getImage();
				$scope.CategoryId = product.getCategoryId();
				$scope.BrandId = product.getBrandId();
				$scope.purchaseURL = product.getPurchaseUrl();

				$scope.brand = dataRepository.getBrandById($scope.BrandId);
				$scope.cat = dataRepository.getCategoryById($scope.CategoryId);

				$scope.loaded = true;

				/**
				 * @param category {Category}
				 */
				$scope.setCategory = function (category) {
					$scope.selectedCategoryId = category.getId();
					$scope.selectedCategoryName = category.getName();
				};
				/**
				 * @param brand {Brand}
				 */
				$scope.setBrand = function(brand) {
					$scope.selectedBrandId = brand.getId();
					$scope.selectedBrandName = brand.getName();
				};
			}
		);

		var ref = firebase.database().ref()
		var syncObject = $firebaseObject(ref)

		$scope.processForm = function() {
			// Start with the original product object, and overwrite any values with values the user has changed.
			/**
			 * @var {Product} product
			 */
			var product = $scope.dataRepository.getProductById($scope.productId);
			if ($scope.NameValue) {
				product.setName($scope.NameValue);
			}
			if ($scope.DescriptionValue) {
				product.setDescription($scope.DescriptionValue);
			}
			if ($scope.PurchaseURLValue) {
				product.setPurchaseUrl($scope.PurchaseURLValue);
			}
			if ($scope.selectedCategoryId) {
				product.setCategoryId($scope.selectedCategoryId);
			}
			if ($scope.selectedBrandId) {
				product.setBrandId($scope.selectedBrandId);
			}
			if ($scope.Image) {
				product.setImage($scope.Image);
				uploadImages(syncObject.products[$scope.productId], 'product', syncObject)
			} else {
				// @TODO: I'm sure this should not be in the "else", but executed every time "processForm" is called.
				$scope.dataRepository.persistProduct(
					product,
					'Edit has been completed!',
					function () {
						$state.go('admin.editProducts');
					}
				);
			}
		};

		syncObject.$loaded().then(function() {
			syncObject.$save().then(
				function() {
					console.log('Done') // true
				},
				function(error) {
					console.log('Error:', error)
				}
			)
		})
	}
])
