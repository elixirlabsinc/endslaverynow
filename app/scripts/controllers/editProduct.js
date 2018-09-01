'use strict'
/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditProductCtrl
 * @description
 * # EditCategoryCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditProductCtrl', [
	'$firebaseArray',
	'$firebaseObject',
	'$routeParams',
	'$scope',
	'CONFIG',
	function($firebaseArray, $firebaseObject, $routeParams, $scope, CONFIG) {
		$scope.productId = $routeParams.id
		var firebaseRef = CONFIG.FIREBASEURL
		var firebase = new Firebase(firebaseRef + '/products/' + $scope.productId)

		$scope.processForm = function() {
			console.log($scope.NameValue)

			if ($scope.NameValue) {
				syncObject.name = $scope.NameValue
			}
			if ($scope.DescriptionValue) {
				syncObject.description = $scope.DescriptionValue
			}
			if ($scope.PurchaseURLValue) {
				syncObject.purchaseUrl = $scope.PurchaseURLValue
			}

			syncObject.$save().then(
				function() {
					console.log('Done') // true
				},
				function(error) {
					window.alert('Error:', error)
				}
			)
		}

		var syncObject = $firebaseObject(firebase)
		syncObject.$loaded().then(function() {
			console.log(syncObject)
			$scope.name = syncObject.name
			$scope.description = syncObject.description
			$scope.purchaseURL = syncObject.purchaseUrl
			$scope.image = syncObject.image

			syncObject.$save().then(
				function() {
					console.log('Done') // true
				},
				function(error) {
					console.log('Error:', error)
				}
			)
		})
	}
])
