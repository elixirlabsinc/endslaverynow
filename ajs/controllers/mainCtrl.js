angularApp.controller('MainCtrl', [
  '$firebaseArray',
	'$firebaseObject', 
  '$scope',
  function($firebaseArray, $firebaseObject, $scope){
    $scope.heading = "Hello World";
    $scope.message = "This is me 12";

    /* firebase */
		var firebase = new Firebase("https://end-slavery-now.firebaseio.com/aatest");
		var syncObject = $firebaseObject(firebase);
		syncObject.$bindTo($scope, "esn");    

  }
]);