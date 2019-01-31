'use strict'

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditCategoriesCtrl
 * @description
 * # EditCategoriesCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditCategoriesCtrl', [
	'$firebaseArray',
	'$scope',
	function($firebaseArray, $scope) {
		$scope.loaded = false

		/* firebase */
    var ref = firebase.database().ref('categories')
    $scope.categories = $firebaseArray(ref)

    $scope.deleteCategory = function(categoriesRef, category) {
      var categoryName = category.name
      var prompt = "Are you sure you want to delete category '" + categoryName + "'?"
      if (!confirm(prompt)) {
        return
      }
      categoriesRef.$remove(category).catch(
        function(error) {
          console.log("Error deleting category: ", error)
        }
      )
    }

		$scope.categories.$loaded().then(function() {
			$scope.loaded = true
		})
	}
])
