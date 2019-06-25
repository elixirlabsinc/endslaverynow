'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditBrandsCtrl
 * @description
 * # EditBrandsCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditBrandsCtrl', [
	'$scope',
	'dataRepositoryFactory',
	function ($scope, dataRepositoryFactory) {
		$scope.loaded = false;

		$scope.brands = [];

		dataRepositoryFactory.ready(
			$scope,
			function () {
				$scope.brands = dataRepositoryFactory.getDataRepository().getBrands();

				$scope.loaded = true;
			}
		);

		// @TODO: brand is now an instance of a model!
	    $scope.deleteBrand = function(brandsRef, brand) {
	      var brandName = brand.name
	      var prompt = "Are you sure you want to delete brand '" + brandName + "'?"

	      if (!confirm(prompt)) {
	        return
	      }
	      brandsRef.$remove(brand).catch(
	        function(error) {
	          console.log("Error deleting brand: ", error)
	        }
	      )
	    }

	}
])
