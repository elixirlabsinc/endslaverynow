'use strict'

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditBrandsCtrl
 * @description
 * # EditBrandsCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditBrandsCtrl', [
	'$firebaseArray',
	'$scope',
	function ($firebaseArray, $scope) {
		$scope.loaded = false
		$scope.brands = []

		/* firebase */
    var ref = firebase.database().ref('brands')
    $scope.brands = $firebaseArray(ref)

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

		$scope.brands.$loaded().then(function () {
			$scope.loaded = true
		})
	}
])
