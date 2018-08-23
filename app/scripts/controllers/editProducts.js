'use strict'

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditBrandsCtrl
 * @description
 * # EditBrandsCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditProductsCtrl', [
	'$firebaseArray',
	'$firebaseObject',
	'$routeParams',
	'$scope',
	'CONFIG',
	function($firebaseArray, $firebaseObject, $routeParams, $scope, CONFIG) {
		$scope.loaded = false
		$scope.allProds = []
		$scope.allBrands = []
		$scope.brand
		
		/* firebase */
		var firebase = new Firebase(CONFIG.FIREBASEURL)
		var syncObject = $firebaseObject(firebase)

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
