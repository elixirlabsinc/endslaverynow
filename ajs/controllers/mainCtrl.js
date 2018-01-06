angularApp.controller('MainCtrl', [
  '$firebaseArray',
	'$firebaseObject', 
  '$scope',
  function($firebaseArray, $firebaseObject, $scope){
    $scope.brands = [];
    $scope.products = [];
    $scope.categories = [];

    /* firebase */
		var firebase = new Firebase("https://end-slavery-now.firebaseio.com/aatest");
		var syncObject = $firebaseObject(firebase);
    
    syncObject.$loaded().then(function() {
      for(brand in syncObject.brands) {
          var temp = syncObject.brands[brand];
          console.log(temp.name);
          $scope.brands.push(temp);
      }

      for(product in syncObject.products) {
          var temp = syncObject.products[product];
          console.log(temp.name);
          $scope.products.push(temp);
      }

      for(category in syncObject.categories) {
          var temp = syncObject.categories[category];
          console.log(temp.name);
          $scope.categories.push(temp);
      }

      $scope.loaded = true;
  });

  }
]);