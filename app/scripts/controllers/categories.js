'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:CategoriesCtrl
 * @description
 * # CategoriesCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
	.controller('CategoriesCtrl', [
		'$scope',
		'dataRepositoryFactory',
		function($scope, dataRepositoryFactory) {
			$scope.loaded = false;
			$scope.allCategories = [];

			dataRepositoryFactory.ready(
				$scope,
				function() {
					$scope.allCategories = dataRepositoryFactory.getDataRepository().getCategories();

					$scope.loaded = true;
				}
			);

		}]);
