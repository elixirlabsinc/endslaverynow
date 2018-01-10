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
          $scope.brands.push(temp);
      }

      for(product in syncObject.products) {
          var temp = syncObject.products[product];
          $scope.products.push(temp);
      }

      for(category in syncObject.categories) {
          var temp = syncObject.categories[category];
          if(temp.parentCategoryId == 0) {
            $scope.categories.push(temp);
          }
      }

      $scope.loaded = true;
  });

  }
]);