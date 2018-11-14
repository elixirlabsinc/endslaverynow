'use strict'
/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditBrandCtrl
 * @description
 * # EditCategoryCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditBrandCtrl', [
	'$firebaseArray',
	'$firebaseObject',
	'$routeParams',
	'$scope',
	'CONFIG',
	function($firebaseArray, $firebaseObject, $routeParams, $scope, CONFIG) {
		$scope.brandId = $routeParams.id
		var firebase = new Firebase(CONFIG.FIREBASEURL)
		var syncObject = $firebaseObject(firebase)
		$scope.products = []

	

		

		$scope.processForm = function() {
			console.log($scope.NameValue)

			if ($scope.NameValue) {
				syncObject.brands[$scope.brandId].name = $scope.NameValue
			}
			if ($scope.DescriptionValue) {
				syncObject.brands[$scope.brandId].description = $scope.DescriptionValue
			}
			
			if ($scope.CategoryValue) {
				// syncObject.ranking = $scope.CategoryValue
			}
			if ($scope.selectedRankName){
				syncObject.brands[$scope.brandId].ranking = $scope.selectedRankName
			}
			if($scope.selectedCategoryId)
			{
				syncObject.brands[$scope.brandId].categories = $scope.selectedCategoryId
			}


			syncObject.$save().then(
				function() {
                    
					console.log('Done') // true
					window.alert('Edit has been completed!')
					window.location.reload()
                
				},
				function(error) {
					window.alert('Error:', error)
				}
			)
		}

		
		syncObject.$loaded().then(function() {
			console.log(syncObject)
			$scope.brands = syncObject.brands
			$scope.categories = syncObject.categories
			$scope.products = syncObject.products
			$scope.loaded = true
			$scope.name = syncObject.brands[$scope.brandId].name
			$scope.description = syncObject.brands[$scope.brandId].description
			$scope.ranking = syncObject.brands[$scope.brandId].ranking
			$scope.image = syncObject.brands[$scope.brandId].image
			$scope.rankingOptions = { good: 'Good', better: 'Better', best: 'Best' }
			$scope.CategoryId = syncObject.brands[$scope.brandId].categories
			$scope.cat = syncObject.categories[$scope.CategoryId]
			
			$scope.setRanking = function (rank) {
				$scope.selectedRankName = rank
			}
			$scope.setCategory = function (category) {
				$scope.selectedCategoryId = category.id
				$scope.selectedCategoryName = category.name
			}
			

			syncObject.$save().then(
				function() {
					console.log('Done') // true
				},
				function(error) {
					console.log('Error:', error)
				}
			)
		})
	}
])
