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
		function ($scope, $firebaseObject) {
			$scope.categories = []

			/* firebase */
			var ref = firebase.database().ref()
			var syncObject = $firebaseObject(ref)

			syncObject.$loaded().then(function() {
				for(var category in syncObject.categories) {
					var tempCat = syncObject.categories[category]
					if (!(tempCat.parentCategoryId > 0)) {
						$scope.categories.push(tempCat)
					}
				}

				$scope.loaded = true
			})

		}])
