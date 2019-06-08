'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
	.controller('MainCtrl', [
		'$scope',
		'dataRepositoryFactory',
		function ($scope, dataRepositoryFactory) {
			$scope.categories = [];

			dataRepositoryFactory.ready(
				function(dataRepository) {
					$scope.categories = dataRepository.getTopLevelCategories();

					$scope.loaded = true;
				});

		}]);
