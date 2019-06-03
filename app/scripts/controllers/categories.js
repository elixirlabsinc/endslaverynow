'use strict'

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:CategoriesCtrl
 * @description
 * # CategoriesCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
	.controller('CategoriesCtrl', [
		'$firebaseObject',
		'$scope',
		'ModelService',
		function($firebaseObject, $scope, modelService){
			$scope.loaded = false
			$scope.allCategories = []

			/* firebase */
			var ref = firebase.database().ref()
			var syncObject = $firebaseObject(ref)

			syncObject.$loaded().then(function() {

				// Convert the raw data into models.
				modelService.parse(syncObject);

				$scope.allCategories = modelService.getCategories();

				$scope.loaded = true
			})
		}])
