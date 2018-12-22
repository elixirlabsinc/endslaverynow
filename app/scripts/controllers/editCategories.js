'use strict'

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditCategoriesCtrl
 * @description
 * # EditCategoriesCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditCategoriesCtrl', [
	'$firebaseObject',
	'$scope',
	function($firebaseObject, $scope) {
		$scope.loaded = false
		$scope.allCategories = []

		/* firebase */
		var ref = firebase.database().ref()
		var syncObject = $firebaseObject(ref)

		syncObject.$loaded().then(function() {
			for (var cat in syncObject.categories) {
				$scope.allCategories.push(syncObject.categories[cat])
			}

			$scope.loaded = true
		})
	}
])
