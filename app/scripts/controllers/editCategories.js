'use strict'

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditCategoriesCtrl
 * @description
 * # EditCategoriesCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditCategoriesCtrl', [
	'$firebaseArray',
	'$firebaseObject',
	'$routeParams',
	'$scope',
	'CONFIG',
	function($firebaseArray, $firebaseObject, $routeParams, $scope, CONFIG) {
		$scope.loaded = false
		$scope.allCategories = []

		/* firebase */
		var firebase = new Firebase(CONFIG.FIREBASEURL)
		var syncObject = $firebaseObject(firebase)

		syncObject.$loaded().then(function() {
			for (var cat in syncObject.categories) {
				$scope.allCategories.push(syncObject.categories[cat])
			}

			$scope.loaded = true
		})
	}
])
