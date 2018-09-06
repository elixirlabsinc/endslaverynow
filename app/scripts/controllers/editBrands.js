'use strict'

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditBrandsCtrl
 * @description
 * # EditBrandsCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditBrandsCtrl', [
	'$firebaseArray',
	'$firebaseObject',
	'$routeParams',
	'$scope',
	'CONFIG',
	function ($firebaseArray, $firebaseObject, $routeParams, $scope, CONFIG) {
		$scope.loaded = false
		$scope.allBrands = []
		$scope.categories = []

		/* firebase */
		var firebase = new Firebase(CONFIG.FIREBASEURL)
		var syncObject = $firebaseObject(firebase)

		syncObject.$loaded().then(function () {
			for (var brand in syncObject.categories) {
				$scope.allBrands.push(syncObject.brands[brand])
			}
			$scope.categories = syncObject.categories

			$scope.loaded = true
		})
	}
])
