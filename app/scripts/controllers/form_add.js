'use strict'

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:FormAddCtrl
 * @description
 * # FormAddCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
	.controller('FormAddCtrl',[
		'$firebaseObject',
		'$stateParams',
		'$scope',
		'$window',
		'Upload',
		function ($firebaseObject, $stateParams, $scope, $window, Upload) {
			$scope.brandId = $stateParams.id
			$scope.loaded = false

			$scope.formType = ''
			$scope.errorMessage = false

			var itemTypes = {
				'categories': {
					name: 'Category',
					getIdFunction: getCategoryId,
					requiredInputs: {
						name: true,
						description: true,
						purchaseUrl: false,
						image: true,
						category: false,
						categories: false,
						brand: false,
						ranking: false,
						parentCategoryId: false
					},
				},
				'brands': {
					name: 'Brand',
					getIdFunction: getBrandId,
					requiredInputs: {
						name: true,
						description: true,
						purchaseUrl: false,
						image: true,
						category: false,
						categories: true,
						brand: false,
						ranking: true
					},
				},
				'products': {
					name: 'Product',
					getIdFunction: getProductId,
					requiredInputs: {
						name: true,
						description: true,
						purchaseUrl: true,
						image: true,
						categoryId: true,
						brandId: true,
						ranking: false,
						parentCategoryId: false
					},
				}
			}

			$scope.rankingOptions = {
				'good': 'Good',
				'better': 'Better',
				'best': 'Best'
			}

			var ref = firebase.database().ref()
			var syncObject = $firebaseObject(ref)

			$scope.products = []

			syncObject.$loaded().then(function() {
				$scope.brands = alphabetizeCollection(syncObject.brands)
				$scope.categories = alphabetizeCollection(syncObject.categories)
				$scope.products = syncObject.products || []
				$scope.loaded = true
			})

			$scope.processForm = function(item) {
				$scope.errorMessage = false
				if(!item) {
					$scope.errorMessage = true
					return
				}

				var id = itemTypes[$scope.formType].getIdFunction()
				item.id = id

				if ($scope.formType === 'categories') {
					item.parentCategoryId = 0
				}

				if($scope.formType === 'products') {
					item.brandId = $scope.selectedBrandId
					item.categoryId = $scope.selectedCategoryId
					item.purchaseUrl = prependHttp(item.purchaseUrl)
					item.purchaseURlClicks = 0
					item.parentCategoryId = 0
				}

				if($scope.formType === 'brands') {
					item.categories = $scope.selectedCategoryId.toString()
					item.ranking = $scope.selectedRankName
				}

				if(!validInput(item, $scope.formType, itemTypes[$scope.formType].requiredInputs)) {
					$scope.errorMessage = true
					return
				} else {
					uploadImages(item, $scope.formType)
				}
			}

			var validInput = function(item, formType, requiredInputs) {
				var isValid = !!item

				for(var req in requiredInputs) {
					if(requiredInputs[req] && !item[req]) {
						isValid = false
					}
				}

				return isValid
			}

			$scope.setCategory = function(category) {
				$scope.selectedCategoryId = category.id
				$scope.selectedCategoryName = category.name
			}

			$scope.setBrand = function(brand) {
				$scope.selectedBrandId = brand.id
				$scope.selectedBrandName = brand.name
			}

			$scope.setRanking = function(rank) {
				$scope.selectedRankName = rank
			}

			$scope.selectItemType = function(itemType) {
				$scope.itemType = itemType ? itemTypes[itemType].name : ''
				$scope.formType = itemType
			}

			$scope.reloadPage = function() {
				$window.location.reload()
			}

			function getCategoryId() {
				var id = $scope.categories.length === 0 ? 1: $scope.categories.length
				while($scope.categories[id] !== undefined) {
					id = id + 1
				}
				return id
			}

			function getBrandId() {
				var id = $scope.brands.length === 0 ? 1 : $scope.brands.length
				while($scope.brands[id] !== undefined) {
					id = id + 1
				}
				return id
			}

			function getProductId() {
				var id = $scope.products.length === 0 ? 1 : $scope.products.length
				while($scope.products[id] !== undefined) {
					id = id + 1
				}
				return id
			}

			function alphabetizeCollection(collection) {
        if (collection === undefined) {
          return []
        }
        if (!Array.isArray(collection)) {
          return [collection]
        }
        collection.sort(function (a, b) {
          return a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        })
				return collection
			}

			function prependHttp(url) {
				if(/^(http)/.test(url)) {
					return url
				} else {
					return 'http://' + url
				}
			}
		}])
