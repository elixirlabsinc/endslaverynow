'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
	.controller('CategoryCtrl', [
		'$transition$',
		'$scope',
		'dataRepositoryFactory',
		function($transition$, $scope, dataRepositoryFactory){
			$scope.categoryId = $transition$.params().id;
			$scope.loaded = false;
			$scope.categoryBrands = [];
			$scope.categoryProducts = [];
			$scope.relatedCategories = [];

			dataRepositoryFactory.ready(
				$scope,
				function(dataRepository) {
					// Get brand information
					$scope.categoryDetails = dataRepository.getCategoryById($scope.categoryId);

					if($scope.categoryDetails === null) {
						return;
					}

					// Get lists of related objects.
					$scope.relatedCategories = dataRepository.getRelatedCategoriesForCategory($scope.categoryDetails);
					$scope.categoryBrands = dataRepository.getBrandCategoriesForCategory($scope.categoryDetails);
					$scope.categoryProducts = dataRepository.getCategoryProductsForCategory($scope.categoryDetails);

					$scope.loaded = true;
				});

		}]);
