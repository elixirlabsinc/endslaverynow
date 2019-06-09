'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
	.controller('ProductCtrl', [
		'$transition$',
		'$scope',
		'dataRepositoryFactory',
		function($transition$, $scope, dataRepositoryFactory){
			$scope.productId = $transition$.params().id;
			$scope.productClicked = false;
			$scope.dataRepository = null;

			dataRepositoryFactory.ready(
				$scope,
				function(dataRepository) {
					// Get product information
					$scope.productDetails = dataRepository.getProductById($scope.productId);

					if($scope.productDetails === null) {
						return;
					}

					$scope.brandDetails = dataRepository.getBrandById($scope.productDetails.getBrandId());
					$scope.categoryDetails = dataRepository.getCategoryById($scope.productDetails.getCategoryId());

					$scope.loaded = true;
					$scope.dataRepository = dataRepository;
				});

			$scope.updateClickCount = function() {
				// Spam Click check - not too sophisticated atm
				if(!$scope.productClicked && $scope.dataRepository !== null) {
					$scope.productClicked = true;
					$scope.productDetails.incrementPurchaseUrlClicks();
					$scope.dataRepository.persistProduct($scope.productDetails);
				}
			};

		}]);
