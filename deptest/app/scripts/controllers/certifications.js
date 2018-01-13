'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:CertificationsCtrl
 * @description
 * # CertificationsCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
  .controller('CertificationsCtrl', [
    '$firebaseArray',
    '$firebaseObject',
    '$routeParams',
    '$scope',
    function($firebaseArray, $firebaseObject, $routeParams, $scope){
      /* firebase */
      var firebase = new Firebase("https://end-slavery-now.firebaseio.com");
      var syncObject = $firebaseObject(firebase);
      syncObject.$loaded().then(function() {
          // Get product information
          $scope.certifications = syncObject.certifications;
          $scope.loaded = true;
      });
  }]);
