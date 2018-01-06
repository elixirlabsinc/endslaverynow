var angularApp = angular.module('AngularApp', [
  'ngRoute',
  'firebase'
]);

angularApp.config(['$routeProvider',
  function($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl : 'views/main.html',
      controller : 'MainCtrl',
      controllerAs : 'main'
    })
    .when('/brand/:id', {
      templateUrl : 'views/brand.html',
      controller : 'BrandCtrl',
      controllerAs : 'brand'
    })
    .when('/category/:id', {
      templateUrl : 'views/category.html',
      controller : 'CategoryCtrl',
      controllerAs : 'category'
    })
    .when('/product/:id', {
      templateUrl : 'views/product.html',
      controller : 'ProductCtrl',
      controllerAs : 'product'
    })
    .when('/ranking', {
      templateUrl : 'views/ranking.html',
      controller : 'RankingCtrl',
      controllerAs : 'ranking'
    })
    .otherwise('/');
  }
]);
