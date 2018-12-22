'use strict'

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:BrandCtrl
 * @description
 * # BrandCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
	.controller('BrandCtrl', [
		'$firebaseObject',
		'$transition$',
		'$scope',
		function ($firebaseObject, $transition$, $scope) {
			$scope.brandId = $transition$.params().id
			$scope.loaded = false
			$scope.brandProducts = []
			$scope.relatedCategories = []

			/* firebase */
			var ref = firebase.database().ref()
			var syncObject = $firebaseObject(ref)

			syncObject.$loaded().then(function() {
				// Get brand information
				$scope.brandDetails = syncObject.brands[$scope.brandId]

				if($scope.brandDetails === null) {
					return
				}

				// Get products for this brand
				for(var prod in syncObject.products) {
					var temp = syncObject.products[prod]
					if(temp.brandId == $scope.brandId) {
						$scope.brandProducts.push(temp)
					}
				}

				$scope.relatedCategoryIds = $scope.brandDetails.categories.split(',')
				for(var rcat in $scope.relatedCategoryIds) {
					$scope.relatedCategories.push(syncObject.categories[$scope.relatedCategoryIds[rcat]])
				}

				$scope.loaded = true
			})

		}])
