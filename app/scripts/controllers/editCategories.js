'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditCategoriesCtrl
 * @description
 * # EditCategoriesCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditCategoriesCtrl', [
	'$scope',
	'dataRepositoryFactory',
	function($scope, dataRepositoryFactory) {
		$scope.loaded = false;

		$scope.categories = [];

		dataRepositoryFactory.ready(
			$scope,
			function () {
				$scope.categories = dataRepositoryFactory.getDataRepository().getCategories();

				$scope.loaded = true;
			}
		);

		/**
		 * @param categoriesRef
		 * @param {Category} category
		 */
		$scope.deleteCategory = function(categoriesRef, category) {
			var prompt = "Are you sure you want to delete category '" + category.getName() + "'?";
			if (!window.confirm(prompt)) {
				return;
			}
			// @TODO: This will need to use the new-style delete process.
			categoriesRef.$remove(category).catch(
				function (error) {
					console.log("Error deleting category: ", error);
				}
			);
		};
	}
]);
