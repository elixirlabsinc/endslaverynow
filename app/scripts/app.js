'use strict'

/**
 * @ngdoc overview
 * @name endslaverynowApp
 * @description
 * # endslaverynowApp
 *
 * Main module of the application.
 */
angular
	.module('endslaverynowApp', [
		'firebase',
		'ngAnimate',
		'ngCookies',
		'ngFileUpload',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch'
	])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl',
				controllerAs: 'main'
			})
			.when('/about', {
				templateUrl: 'views/about.html',
				controller: 'AboutCtrl',
				controllerAs: 'about'
			})
			.when('/deleteCat/:id', {
				templateUrl: 'views/deleteCategory.html',
				controller: 'DeleteCatCtrl',
				controllerAs: 'deletecat',
				authorize: true
			})
			.when('/add', {
				templateUrl: 'views/form_add.html',
				controller: 'FormAddCtrl',
				controllerAs: 'formAdd',
				authorize: true
			})
			.when('/brand/:id', {
				templateUrl: 'views/brand.html',
				controller: 'BrandCtrl',
				controllerAs: 'brand'
			})
			.when('/editCategories', {
				templateUrl: 'views/editCategories.html',
				controller: 'EditCategoriesCtrl',
				controllerAs: 'editCategories',
				authorize: true
			})
			.when('/editBrands', {
				templateUrl: 'views/editBrands.html',
				controller: 'EditBrandsCtrl',
				controllerAs: 'editBrands',
				authorize: true
			})
			.when('/editProducts', {
				templateUrl: 'views/editProducts.html',
				controller: 'EditProductsCtrl',
				controllerAs: 'editProducts',
				authorize: true
			})
			.when('/edit-delete', {
				templateUrl: 'views/edit-delete.html',
				controller: 'EditDeleteCtrl',
				controllerAs: 'edit-delete',
				authorize: true
			})
			.when('/editCategory/:id', {
				templateUrl: 'views/editCategory.html',
				controller: 'EditCategoryCtrl',
				controllerAs: 'editCategory',
				authorize: true
			})
			.when('/categories', {
				templateUrl: 'views/categories.html',
				controller: 'CategoriesCtrl',
				controllerAs: 'categories'
			})
			.when('/category/:id', {
				templateUrl: 'views/category.html',
				controller: 'CategoryCtrl',
				controllerAs: 'category'
			})
			.when('/certifications', {
				templateUrl: 'views/certifications.html',
				controller: 'CertificationsCtrl',
				controllerAs: 'certifications'
			})
			.when('/editBrand/:id',{
				templateUrl: 'views/editBrand.html',
				controller: 'EditBrandCtrl',
				controllerAs: 'editBrand',
				authorize: true
			})
			.when('/editProduct/:id', {
				templateUrl: 'views/editProduct.html',
				controller: 'EditProductCtrl',
				controllerAs: 'editProduct',
				authorize: true
			})
			.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'SessionsCtrl',
				controllerAs: 'sessions'
			})
			.when('/users', {
				templateUrl: 'views/users.html',
				controller: 'UsersCtrl',
				controllerAs: 'users',
				authorize: true
			})
			.when('/product/:id', {
				templateUrl: 'views/product.html',
				controller: 'ProductCtrl',
				controllerAs: 'product'
			})
			.when('/rankings', {
				templateUrl: 'views/rankings.html',
				controller: 'RankingsCtrl',
				controllerAs: 'rankings'
			})
			.otherwise({ redirectTo: '/' })
	})
	.factory('authorize',
		['$rootScope', function($rootScope) {
			return function() {
				if ($rootScope.currentUser) {
					return true
				} else {
					location.href = '#!/login'
				}
			}
	}])
	.run(['$rootScope', 'authorize', function($rootScope, authorize) {
		// Test details
		var config = {
			apiKey: 'AIzaSyAr-mF9ntUnisSJpOj6bEZ7U0kdoOewgRA',
			authDomain: 'end-slavery-now-test.firebaseapp.com',
			databaseURL: 'https://end-slavery-now-test.firebaseio.com',
			projectId: 'end-slavery-now-test',
			storageBucket: 'end-slavery-now-test.appspot.com',
			messagingSenderId: '285898483037'
		}
		// Staging details
		// var config = {
		// 	apiKey: 'AIzaSyD9_sUa5MnIA0CxsO44Oofd5_7y-j45SXg',
		// 	authDomain: 'end-slavery-now.firebaseapp.com',
		// 	databaseURL: 'https://end-slavery-now.firebaseio.com',
		// 	projectId: 'end-slavery-now',
		// 	storageBucket: 'end-slavery-now.appspot.com',
		// 	messagingSenderId: '48416679514'
		// }
		if (!firebase.apps.length) {
			firebase.initializeApp(config)
		}

		// register firebase observer on user
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				$rootScope.currentUser = user
			} else {
				$rootScope.currentUser = null
			}

			$rootScope.$on('$routeChangeStart', function(event, to, from){
				if (to.authorize === true) {
					authorize()
				}
			})
		})
	}])
