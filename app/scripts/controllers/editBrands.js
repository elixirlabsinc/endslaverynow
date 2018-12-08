'use strict'

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditBrandsCtrl
 * @description
 * # EditBrandsCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditBrandsCtrl', [
	'$firebaseObject',
	'$routeParams',
	'$scope',
	function ($firebaseObject, $routeParams, $scope) {
		$scope.loaded = false
		$scope.allBrands = []
		$scope.categories = []

		/* firebase */
		var ref = firebase.database().ref()
		var syncObject = $firebaseObject(ref)

		syncObject.$loaded().then(function () {
			for (var brand in syncObject.brands) {
				$scope.allBrands.push(syncObject.brands[brand])
			}
			$scope.categories = syncObject.categories

			$scope.loaded = true
		})
	}
])
