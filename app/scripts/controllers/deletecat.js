'use strict'

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:DeleteCatCtrl
 * @description
 * # CategoriesCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
	.controller('DeleteCatCtrl', [
		'$firebaseObject',
		'$routeParams',
		'$scope',
		function ($firebaseObject, $routeParams, $scope) {
			$scope.categoryId = $routeParams.id

			var ref = firebase.database().ref()
			var syncObject = $firebaseObject(ref)

			syncObject.$loaded().then(function () {
				console.log(syncObject)
			})
		}])
