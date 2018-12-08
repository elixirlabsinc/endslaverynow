'use strict'
/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditCategoryCtrl
 * @description
 * # EditCategoryCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditCategoryCtrl', [
	'$firebaseObject',
	'$routeParams',
	'$scope',
	function($firebaseObject, $routeParams, $scope) {
		$scope.categoryId = $routeParams.id

		var ref = firebase.database().ref()
		var syncObject = $firebaseObject(ref)

		$scope.processForm = function(){
			if($scope.NameValue){
				syncObject.categories[$scope.categoryId].name = $scope.NameValue
			}
			if($scope.DescriptionValue){
				syncObject.categories[$scope.categoryId].description = $scope.DescriptionValue
			}
			if ($scope.Image) {
				syncObject.categories[$scope.categoryId].image = $scope.Image
				uploadImages(syncObject.categories[$scope.categoryId], 'category', syncObject)
			} else {
				saveSyncObject(syncObject, 'Edit has been completed!')
			}
		}

		syncObject.$loaded().then(function() {
			$scope.name = syncObject.categories[$scope.categoryId].name
			$scope.description = syncObject.categories[$scope.categoryId].description
			$scope.image = syncObject.categories[$scope.categoryId].image

			syncObject.$save().then(function () {
				console.log('Done') // true
			}, function (error) {
				console.log('Error:', error)
			})
		})
	}
])
