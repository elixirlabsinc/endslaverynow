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
    'CONFIG',
    function($firebaseArray, $firebaseObject, $routeParams, $scope, CONFIG){
      /* firebase */
      var firebase = new Firebase(CONFIG.FIREBASEURL);
      var syncObject = $firebaseObject(firebase);
      syncObject.$loaded().then(function() {
          // Get product information
          $scope.certifications = syncObject.certifications;
          $scope.loaded = true;
      });
  }]);
