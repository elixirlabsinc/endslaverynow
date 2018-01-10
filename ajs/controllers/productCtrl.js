angularApp.controller('ProductCtrl', [
    '$firebaseArray',
    '$firebaseObject',
    '$routeParams',
    '$scope',
    function($firebaseArray, $firebaseObject, $routeParams, $scope){

      $scope.productId = $routeParams.id;

      /* firebase */
      var firebase = new Firebase("https://end-slavery-now.firebaseio.com/aatest");
      var syncObject = $firebaseObject(firebase);
      syncObject.$loaded().then(function() {
          // Get product information
          $scope.productDetails = syncObject.products[$scope.productId];

          if($scope.productDetails == null) {
              return
          }
          
          // TODO: CHECK FOR BRAND ID IN PRODUCTD DETAILS BEFORE ASSIGNING BRAND DETAILS
          $scope.brandDetails = syncObject.brands[$scope.productDetails.brandId];

          $scope.loaded = true;
      });

        /**
         * TODO: 1. get the productId from the path
         *       2. Get the product details specifically related to that id
         *          - brand name
         *          - link to brand page
         *          - include URL for product purchasing page in the database
         *       3. display those product details
         */ 
  
    }
  ]);