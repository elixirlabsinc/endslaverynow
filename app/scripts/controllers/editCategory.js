'use strict'
/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditCategoryCtrl
 * @description
 * # EditCategoryCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditCategoryCtrl', [
	'$firebaseArray',
	'$firebaseObject',
	'$routeParams',
	'$scope',
	'CONFIG',
	function($firebaseArray, $firebaseObject, $routeParams, $scope, CONFIG) {
		$scope.categoryId = $routeParams.id
		var firebaseRef = CONFIG.FIREBASEURL
		var firebase = new Firebase(
			firebaseRef + '/categories/' + $scope.categoryId
		)

		$scope.processForm = function(){
			if($scope.NameValue){
				syncObject.name = $scope.NameValue
			}
			if($scope.DescriptionValue){
				syncObject.description = $scope.DescriptionValue
			}
			if ($scope.Image) {
				syncObject.image = $scope.Image
				uploadImages(syncObject, CONFIG.APPCONFIG, 'category', syncObject)
			} else {
				saveSyncObject(syncObject, 'Edit has been completed!')
			}
		}

		var syncObject = $firebaseObject(firebase)
		syncObject.$loaded().then(function() {
			$scope.name = syncObject.name
			$scope.description = syncObject.description
			$scope.image = syncObject.image

			syncObject.$save().then(function () {
				console.log('Done') // true
			}, function (error) {
				console.log('Error:', error)
			})
		})
	}
])
