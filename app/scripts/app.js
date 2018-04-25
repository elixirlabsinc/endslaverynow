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
    'ngFileUpload',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .constant('CONFIG', {
    // // Test Details
    // 'FIREBASEURL': 'https://end-slavery-now-test.firebaseio.com',
    // "APPCONFIG": {
    //   apiKey: "AIzaSyAr-mF9ntUnisSJpOj6bEZ7U0kdoOewgRA",
    //   authDomain: "end-slavery-now-test.firebaseapp.com",
    //   databaseURL: "https://end-slavery-now-test.firebaseio.com",
    //   projectId: "end-slavery-now-test",
    //   storageBucket: "end-slavery-now-test.appspot.com",
    //   messagingSenderId: "285898483037"
    // }

    // Staging Details
    'FIREBASEURL': 'https://end-slavery-now.firebaseio.com',
    "APPCONFIG": {
      apiKey: "AIzaSyD9_sUa5MnIA0CxsO44Oofd5_7y-j45SXg",
      authDomain: "end-slavery-now.firebaseapp.com",
      databaseURL: "https://end-slavery-now.firebaseio.com",
      projectId: "end-slavery-now",
      storageBucket: "end-slavery-now.appspot.com",
      messagingSenderId: "48416679514"
    }
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
      .when('/add', {
        templateUrl: 'views/form_add.html',
        controller: 'FormAddCtrl',
        controllerAs: 'formAdd'
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
