'use strict'
/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditProductCtrl
 * @description
 * # EditCategoryCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditProductCtrl', [
	'$firebaseObject',
	'$stateParams',
	'$scope',
  '$state',
	function($firebaseObject, $stateParams, $scope, $state) {
		$scope.productId = $stateParams.id;

		var ref = firebase.database().ref()
		var syncObject = $firebaseObject(ref)

		$scope.processForm = function() {
			if ($scope.NameValue) {
				syncObject.products[$scope.productId].name = $scope.NameValue
			}
			if ($scope.DescriptionValue) {
				syncObject.products[$scope.productId].description = $scope.DescriptionValue
			}
			if ($scope.PurchaseURLValue) {
				syncObject.products[$scope.productId].purchaseUrl = $scope.PurchaseURLValue
			}
			if ($scope.selectedCategoryId) {
				syncObject.products[$scope.productId].categoryId = $scope.selectedCategoryId
			}
			if ($scope.selectedBrandId) {
				syncObject.products[$scope.productId].brandId = $scope.selectedBrandId
			}
			if ($scope.Image) {
				syncObject.products[$scope.productId].image = $scope.Image
				uploadImages(syncObject.products[$scope.productId], 'product', syncObject)
			} else {
				saveSyncObject(syncObject, 'Edit has been completed!')
			}
			$state.go('admin.editProducts')
		}

		syncObject.$loaded().then(function() {
			$scope.brands = syncObject.brands
			$scope.categories = syncObject.categories
			$scope.products = syncObject.products
			$scope.loaded = true
			$scope.name = syncObject.products[$scope.productId].name
			$scope.description = syncObject.products[$scope.productId].description
			$scope.ranking = syncObject.products[$scope.productId].ranking
			$scope.image = syncObject.products[$scope.productId].image

			$scope.CategoryId = syncObject.products[$scope.productId].categoryId
			$scope.cat = syncObject.categories[$scope.CategoryId]
			$scope.BrandId = syncObject.products[$scope.productId].brandId
			$scope.brand = syncObject.brands[$scope.BrandId]
			$scope.purchaseURL = syncObject.products[$scope.productId].purchaseUrl

			$scope.setCategory = function (category) {
				$scope.selectedCategoryId = category.id
				$scope.selectedCategoryName = category.name
			}
			$scope.setBrand = function(brand) {
				$scope.selectedBrandId = brand.id
				$scope.selectedBrandName = brand.name
			};

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
