'use strict'

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
		'$firebaseObject',
		'ModelService',
		function ($scope, $firebaseObject, modelService) {
			$scope.categories = []

			/* firebase */
			var ref = firebase.database().ref()
			var syncObject = $firebaseObject(ref)

			syncObject.$loaded().then(function() {

				// Convert the raw data into models.
				modelService.parse(syncObject);

				$scope.categories = modelService.getTopLevelCategories();

				$scope.loaded = true
			})

		}])
