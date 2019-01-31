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
	'$routeParams',
	'$scope',
	function($firebaseArray, $routeParams, $scope) {
		$scope.loaded = false

		/* firebase */
    var ref = firebase.database().ref('products')
    $scope.products = $firebaseArray(ref)

    $scope.deleteProduct = function(productsRef, product) {
      var prompt = "Are you sure you want to delete product '" + product.name + "'?"
      if (!confirm(prompt)) {
        return
      }
      productsRef.$remove(product).catch(
        function(error) {
          console.log("Error deleting product: ", error)
        }
      )
    }

    $scope.products.$loaded().then(function() {
      $scope.loaded = true
		})
	}
])
