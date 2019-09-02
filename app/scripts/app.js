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
		'env',
		'firebase',
		'ngAnimate',
		'ngCookies',
		'ngFileUpload',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'ui.router'
	])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('/', {
				url: '/',
				templateUrl: 'views/main.html',
				controller: 'MainCtrl',
				controllerAs: 'main'
			})
			.state('about', {
				url: '/about',
				templateUrl: 'views/about.html',
				controller: 'AboutCtrl',
				controllerAs: 'about'
			})
			.state('admin.add', {
				url: '/add',
				templateUrl: 'views/admin.formAdd.html',
				controller: 'FormAddCtrl',
				controllerAs: 'formAdd',
				resolve: {
					'currentAuth': ['Auth', function(Auth) {
						return Auth.$requireSignIn
					}]
				}
			})
			.state('brand', {
				url: '/brand/:id',
				templateUrl: 'views/brand.html',
				controller: 'BrandCtrl',
				controllerAs: 'brand'
			})
			.state('admin', {
				url: '/admin',
				templateUrl: 'views/admin.html',
				resolve: {
					'currentAuth': ['Auth', function(Auth) {
						return Auth.$requireSignIn()
					}]
				}
			})
			.state('admin.editCategories', {
				url: '/editCategories',
				templateUrl: 'views/admin.editCategories.html',
				controller: 'EditCategoriesCtrl',
				controllerAs: 'editCategories',
				resolve: {
					'currentAuth': ['Auth', function(Auth) {
						return Auth.$requireSignIn
					}]
				}
			})
			.state('admin.editBrands', {
				url: '/editBrands',
				templateUrl: 'views/admin.editBrands.html',
				controller: 'EditBrandsCtrl',
				controllerAs: 'editBrands',
				resolve: {
					'currentAuth': ['Auth', function(Auth) {
						return Auth.$requireSignIn
					}]
				}
			})
			.state('admin.editProducts', {
				url: '/editProducts',
				templateUrl: 'views/admin.editProducts.html',
				controller: 'EditProductsCtrl',
				controllerAs: 'editProducts',
				resolve: {
					'currentAuth': ['Auth', function(Auth) {
						return Auth.$requireSignIn
					}]
				}
			})
			.state('admin.editCategory', {
				url: '/editCategory/:id',
				templateUrl: 'views/admin.editCategory.html',
				controller: 'EditCategoryCtrl',
				controllerAs: 'editCategory',
				resolve: {
					'currentAuth': ['Auth', function(Auth) {
						return Auth.$requireSignIn
					}]
				}
			})
			.state('categories', {
				url: '/categories',
				templateUrl: 'views/categories.html',
				controller: 'CategoriesCtrl',
				controllerAs: 'categories'
			})
			.state('category', {
				url: '/category/:id',
				templateUrl: 'views/category.html',
				controller: 'CategoryCtrl',
				controllerAs: 'category'
			})
			.state('certifications', {
				url: '/certifications',
				templateUrl: 'views/certifications.html',
				controller: 'CertificationsCtrl',
				controllerAs: 'certifications'
			})
			.state('admin.editBrand', {
				url: '/editBrand/:id',
				templateUrl: 'views/admin.editBrand.html',
				controller: 'EditBrandCtrl',
				controllerAs: 'editBrand',
				resolve: {
					'currentAuth': ['Auth', function(Auth) {
						return Auth.$requireSignIn
					}]
				}
			})
			.state('admin.editProduct', {
				url: '/editProduct/:id',
				templateUrl: 'views/admin.editProduct.html',
				controller: 'EditProductCtrl',
				controllerAs: 'editProduct',
				resolve: {
					'currentAuth': ['Auth', function(Auth) {
						return Auth.$requireSignIn
					}]
				}
			})
			.state('login', {
				url: '/login',
				templateUrl: 'views/login.html',
				controller: 'SessionsCtrl',
				controllerAs: 'sessions'
			})
			.state('admin.users', {
				url: '/users',
				templateUrl: 'views/admin.users.html',
				controller: 'UsersCtrl',
				controllerAs: 'users',
				resolve: {
					'currentAuth': ['Auth', function(Auth) {
						return Auth.$requireSignIn
					}]
				}
			})
			.state('product', {
				url: '/product/:id',
				templateUrl: 'views/product.html',
				controller: 'ProductCtrl',
				controllerAs: 'product'
			})
			.state('rankings', {
				url: '/rankings',
				templateUrl: 'views/rankings.html',
				controller: 'RankingsCtrl',
				controllerAs: 'rankings'
			})
			.state('admin.auditLogReport', {
				url: '/auditLogReport',
				templateUrl: 'views/auditLog/admin.auditLogReport.html',
				controller: 'AuditLogReportCtrl',
				controllerAs: 'auditLogReport',
				resolve: {
					'currentAuth': ['Auth', function(Auth) {
						return Auth.$requireSignIn;
					}]
				}
			});

			$urlRouterProvider.otherwise('/')
	})
	.factory('Auth', ['$firebaseAuth',
		function($firebaseAuth) {
			return $firebaseAuth()
		}
	])
	.factory('dataRepositoryFactory', ['$firebaseObject', '$firebaseArray',
		function($firebaseObject, $firebaseArray) {
			return new DataRepositoryFactory($firebaseObject, $firebaseArray);
		}
	])
	.run(['$rootScope', '$transitions', '$state', 'ENV', function($rootScope, $transitions, $state, ENV) {
		var config = {
			apiKey: ENV.firebase.apiKey,
			authDomain: ENV.firebase.authDomain,
			databaseURL: ENV.firebase.databaseURL,
			projectId: ENV.firebase.projectId,
			storageBucket: ENV.firebase.storageBucket,
			messagingSenderId: ENV.firebase.messagingSenderId
		}
		if (!firebase.apps.length) {
			firebase.initializeApp(config)
		}

		$transitions.onError({}, function(transition) {
			if (transition.error().detail === 'AUTH_REQUIRED') {
				$state.go('login')
			}
		})

		// register firebase observer on user
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				$rootScope.currentUser = user
			} else {
				$rootScope.currentUser = null
			}
		})
	}])
