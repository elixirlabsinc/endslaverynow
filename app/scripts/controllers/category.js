'use strict'

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
	.controller('CategoryCtrl', [
		'$firebaseObject',
		'$transition$',
		'$scope',
		function($firebaseObject, $transition$, $scope){
			$scope.categoryId = $transition$.params().id
			$scope.loaded = false
			$scope.categoryBrands = []
			$scope.categoryProducts = []
			$scope.relatedCategories = []

			/* firebase */
			var ref = firebase.database().ref()
			var syncObject = $firebaseObject(ref)

			syncObject.$loaded().then(function() {
				// Get brand information
				$scope.categoryDetails = syncObject.categories[$scope.categoryId]

				if($scope.categoryDetails === null) {
					return
				}

				for(var cat in syncObject.categories) {
					if(syncObject.categories[cat].id == $scope.categoryDetails.parentCategoryId) {
						$scope.relatedCategories.push(syncObject.categories[cat])
					}
					if (syncObject.categories[cat].parentCategoryId == $scope.categoryId ||
						syncObject.categories[cat].parentCategoryId == $scope.categoryDetails.parentCategoryId
					) {
						if(syncObject.categories[cat].id != $scope.categoryId && syncObject.categories[cat].parentCategoryId != 0) {
							$scope.relatedCategories.push(syncObject.categories[cat])
						}
					}
				}

				for(var brand in syncObject.brands) {
					var tempBrand = syncObject.brands[brand]
					$scope.brandCategories = String(tempBrand.categories).split(',')
					for(var catId in $scope.brandCategories) {
						if($scope.brandCategories[catId] == $scope.categoryId) {
							$scope.categoryBrands.push(tempBrand)
						}
					}
				}

				for(var product in syncObject.products) {
					var tempProd = syncObject.products[product]
					if(tempProd.categoryId == $scope.categoryId) {
						$scope.categoryProducts.push(tempProd)
					}
				}

				$scope.loaded = true
			})

		}])
