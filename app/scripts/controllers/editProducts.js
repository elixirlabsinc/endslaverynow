'use strict'

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditBrandsCtrl
 * @description
 * # EditBrandsCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditProductsCtrl', [
	'$firebaseObject',
	'$routeParams',
	'$scope',
	function($firebaseObject, $routeParams, $scope) {
		$scope.loaded = false
		$scope.allProds = []
		$scope.allBrands = []
		$scope.brand

		/* firebase */
		var ref = firebase.database().ref()
		var syncObject = $firebaseObject(ref)

		syncObject.$loaded().then(function() {
			for (var prod in syncObject.products) {
				$scope.allProds.push(syncObject.products[prod])
			}
			for (var brand in syncObject.brands) {
				$scope.allBrands.push(syncObject.brands[brand])
			}
		})
		$scope.selectBrand = function(brandId){
			console.log('hi'+brandId)
			for(var brand in $scope.allBrands)
			{
				if(brand.id===brandId)
				{
					$scope.brand = brand.name
					console.log($scope.brand)
				}
			}
		}

		$scope.loaded = true
	}
])
