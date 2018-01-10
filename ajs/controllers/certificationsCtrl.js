angularApp.controller('CertificationsCtrl', [
    '$firebaseArray',
    '$firebaseObject',
    '$routeParams',
    '$scope',
    function($firebaseArray, $firebaseObject, $routeParams, $scope){

      /* firebase */
      var firebase = new Firebase("https://end-slavery-now.firebaseio.com/aatest");
      var syncObject = $firebaseObject(firebase);
      syncObject.$loaded().then(function() {
          // Get product information
          $scope.certifications = syncObject.certifications;
          $scope.loaded = true;
      });
  
    }
  ]);