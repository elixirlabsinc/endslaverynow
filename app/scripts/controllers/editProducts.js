'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditBrandsCtrl
 * @description
 * # EditBrandsCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditProductsCtrl', [
	'$scope',
	'dataRepositoryFactory',
	function($scope, dataRepositoryFactory) {
		$scope.loaded = false;

		$scope.products = [];

		dataRepositoryFactory.ready(
			$scope,
			function () {
				$scope.products = dataRepositoryFactory.getDataRepository().getProducts();

				$scope.loaded = true;
			}
		);

	    // @TODO: product is now an instance of a model
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

	}
])
