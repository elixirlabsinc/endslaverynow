'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditBrandCtrl
 * @description
 * # EditCategoryCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditBrandCtrl', [
	'$firebaseObject', // @TODO: This can be removed once the image stuff is done
	'$transition$',
	'$scope',
	'$state',
	'dataRepositoryFactory',
	function($firebaseObject, $transition$, $scope, $state, dataRepositoryFactory) {
		$scope.brandId = $transition$.params().id;

		// FIXME: I don't think brands and products are used, but check before removing.
		$scope.brands = [];
		$scope.categories = [];
		$scope.products = [];

		$scope.dataRepository = null;

		$scope.NameValue = null;
		$scope.DescriptionValue = null;
		$scope.selectedRankName = null;
		$scope.selectedCategoryId = null;
		$scope.selectedCategoryName = null;
		$scope.Image = null;

		dataRepositoryFactory.ready(
			$scope,
			function() {
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

				$scope.setRanking = function (rankName) {
					$scope.selectedRankName = rankName;
				};
				$scope.setCategory = function (category) {
					$scope.selectedCategoryId = category.getId();
					$scope.selectedCategoryName = category.getName();
				};

				$scope.loaded = true;
			}
		);

		var ref = firebase.database().ref()
		var syncObject = $firebaseObject(ref)

		$scope.processForm = function() {
			// Start with the original brand object, and overwrite any values with values the user has changed.
			var brand = $scope.dataRepository.getBrandById($scope.brandId);
			if ($scope.NameValue) {
				brand.setName($scope.NameValue);
			}
			if ($scope.DescriptionValue) {
				brand.setDescription($scope.DescriptionValue);
			}
			if ($scope.selectedRankName) {
				brand.setRanking($scope.selectedRankName);
			}
			if ($scope.selectedCategoryId) {
				brand.setCategoryIds([$scope.selectedCategoryId]); // We need to pass in an array of category ids.
			}
			if ($scope.Image) {
				brand.setImage($scope.Image);
				// @TODO: the uploadImages method needs to be moved to the DataRepository class.
				uploadImages(syncObject.brands[$scope.brandId], 'brand', syncObject)
			} else {
				$scope.dataRepository.persistBrand(
					brand,
					'Edit has been completed!',
					function () {
						$state.go('admin.editBrands');
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
