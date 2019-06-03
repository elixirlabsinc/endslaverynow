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
		'ModelService',
		function($firebaseObject, $transition$, $scope, modelService){
			$scope.categoryId = $transition$.params().id
			$scope.loaded = false
			$scope.categoryBrands = []
			$scope.categoryProducts = []
			$scope.relatedCategories = []

			/* firebase */
			var ref = firebase.database().ref()
			var syncObject = $firebaseObject(ref)

			syncObject.$loaded().then(function() {

				// Convert the raw data into models.
				modelService.parse(syncObject);

				// Get brand information
				$scope.categoryDetails = modelService.getCategoryById($scope.categoryId);

				if($scope.categoryDetails === null) {
					return
				}

				$scope.relatedCategories = modelService.getRelatedCategoriesForCategory($scope.categoryDetails);
				$scope.categoryBrands = modelService.getBrandCategoriesForCategory($scope.categoryDetails);

				// This block would be replaced by: $scope.categoryProducts = modelService.getCategoryProductsForCategory($scope.categoryDetails);
				for(var product in syncObject.products) {
					var tempProd = syncObject.products[product]
					if(tempProd.categoryId == $scope.categoryId) {
						$scope.categoryProducts.push(tempProd)
					}
				}

				$scope.loaded = true
			})

		}])
