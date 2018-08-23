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
		'$firebaseArray',
		'$firebaseObject',
		'$routeParams',
		'$scope',
		'CONFIG',
		function ($firebaseArray, $firebaseObject, $routeParams, $scope, CONFIG) {
			$scope.categoryId = $routeParams.id
			var firebaseRef = CONFIG.FIREBASEURL
			var firebase = new Firebase(
				firebaseRef + '/categories/' + $scope.categoryId
			)
			var syncObject = $firebaseObject(firebase)
			syncObject.$loaded().then(function () {
				console.log(syncObject)
               
			})
		}])
