'use strict';

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
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .constant('CONFIG', {
    'FIREBASEURL': 'https://end-slavery-now.firebaseio.com'
  })
  .config(function ($routeProvider) {
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
      .when('/brand/:id', {
        templateUrl: 'views/brand.html',
        controller: 'BrandCtrl',
        controllerAs: 'brand'
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
      .otherwise({
        redirectTo: '/'
      });
  });
