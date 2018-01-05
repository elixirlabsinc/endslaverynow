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
    .when('/product/:id', {
      templateUrl : 'views/product.html',
      controller : 'ProductCtrl',
      controllerAs : 'product'
    })
    .otherwise('/');
  }
]);
