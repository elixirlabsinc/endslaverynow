'use strict'

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:BrandCtrl
 * @description
 * # BrandCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
	.controller('BrandCtrl', [
		'$transition$',
		'$scope',
		'dataRepositoryFactory',
		function ($transition$, $scope, dataRepositoryFactory) {
			$scope.brandId = $transition$.params().id;
			$scope.loaded = false;
			$scope.brandProducts = [];
			$scope.relatedCategories = [];

			dataRepositoryFactory.ready(
				$scope,
				function(dataRepository) {
					// Get brand information
					$scope.brandDetails = dataRepository.getBrandById($scope.brandId);

					if($scope.brandDetails === null) {
						return;
					}

					// Get products for this brand
					$scope.brandProducts = dataRepository.getBrandProductsForBrand($scope.brandDetails);

					// Get categories related to this brand
					$scope.relatedCategories = dataRepository.getRelatedCategoriesForBrand($scope.brandDetails);

					$scope.loaded = true;
			});

		}]);
