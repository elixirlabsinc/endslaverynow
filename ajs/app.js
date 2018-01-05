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
    .when('/product/:id', {
      templateUrl : 'views/product.html',
      controller : 'ProductCtrl',
      controllerAs : 'product'
    })
    .otherwise('/');
  }
]);
