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
	'$transition$',
	'$scope',
	'$state',
	function($firebaseObject, $transition$, $scope, $state) {
		$scope.categoryId = $transition$.params().id

		var ref = firebase.database().ref()
		var syncObject = $firebaseObject(ref)

		$scope.processForm = function(){
			if($scope.NameValue){
				syncObject.categories[$scope.categoryId].name = $scope.NameValue
			}
			if($scope.DescriptionValue){
				syncObject.categories[$scope.categoryId].description = $scope.DescriptionValue
			}
			if ($scope.selectedParentCategoryId) {
				syncObject.categories[$scope.categoryId].parentCategoryId = $scope.selectedParentCategoryId
			} else {
				syncObject.categories[$scope.categoryId].parentCategoryId = null
			}
			if ($scope.Image) {
				syncObject.categories[$scope.categoryId].image = $scope.Image
				uploadImages(syncObject.categories[$scope.categoryId], 'category', syncObject)
			} else {
				saveSyncObject(syncObject, 'Edit has been completed!')
			}
			$state.go('admin.editCategories')
		}

    syncObject.$loaded().then(function() {
      $scope.categories = syncObject.categories.filter(function(category) {
        return category !== undefined
      })

      var category = syncObject.categories[$scope.categoryId]
      $scope.name = category.name
      $scope.description = category.description
      $scope.parentCategory = syncObject.categories[category.parentCategoryId]
      $scope.image = category.image

      $scope.setParentCategory = function(category) {
        $scope.selectedParentCategoryId = category.id
        $scope.selectedParentCategoryName = category.name
      }

      $scope.removeParentCategory = function() {
        $scope.parentCategory = null
        $scope.setParentCategory({})
      }

			syncObject.$save().then(function () {
				console.log('Done') // true
			}, function (error) {
				console.log('Error:', error)
			})
		})
	}
])
