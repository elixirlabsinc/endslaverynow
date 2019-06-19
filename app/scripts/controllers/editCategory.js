'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:EditCategoryCtrl
 * @description
 * # EditCategoryCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('EditCategoryCtrl', [
	'$firebaseObject', // @TODO: This can be removed once the image stuff is done
	'$transition$',
	'$scope',
	'$state',
	'dataRepositoryFactory',
	function($firebaseObject, $transition$, $scope, $state, dataRepositoryFactory) {
		$scope.categoryId = $transition$.params().id;

		$scope.categories = [];

		$scope.NameValue = null;
		$scope.DescriptionValue = null;
		$scope.selectedParentCategoryId = null;
		$scope.Image = null;

		dataRepositoryFactory.ready(
			$scope,
			function(dataRepository) {
				$scope.dataRepository = dataRepository;

				$scope.categories = dataRepository.getCategories();

				// Set up the individual field values.
				var category = dataRepository.getCategoryById($scope.categoryId);
				$scope.name = category.getName();
				$scope.description = category.getDescription();
				$scope.parentCategory = dataRepository.getCategoryById(category.getParentCategoryId());
				$scope.image = category.getImage();

				/**
				 * @param category {Category|null}
				 */
				$scope.setParentCategory = function(category) {
					$scope.selectedParentCategoryId = category ? category.getId() : null;
					$scope.selectedParentCategoryName = category ? category.getName() : null;
				};

				$scope.removeParentCategory = function() {
					$scope.parentCategory = null;
					$scope.setParentCategory(null);
				};
			}
		);

		var ref = firebase.database().ref()
		var syncObject = $firebaseObject(ref)

		$scope.processForm = function(){
			// Start with the original category object, and overwrite any values with values the user has changed.
			/**
			 * @var {Category} category
			 */
			var category = $scope.dataRepository.getCategoryById($scope.categoryId);
			if($scope.NameValue){
				category.setName($scope.NameValue);
			}
			if($scope.DescriptionValue){
				category.setDescription($scope.DescriptionValue);
			}
			if ($scope.selectedParentCategoryId) {
				category.setParentCategoryId($scope.selectedParentCategoryId);
			} else {
				category.setParentCategoryId(null);
			}
			if ($scope.Image) {
				category.setImage($scope.Image);
				uploadImages(syncObject.categories[$scope.categoryId], 'category', syncObject)
			} else {
				// @TODO: I'm sure this should not be in the "else", but executed every time "processForm" is called.
				$scope.dataRepository.persistCategory(
					category,
					'Edit has been completed!',
					function () {
						$state.go('admin.editCategories');
					}
				);
			}
		};

    syncObject.$loaded().then(function() {
			syncObject.$save().then(function () {
				console.log('Done') // true
			}, function (error) {
				console.log('Error:', error)
			})
		})
	}
])
