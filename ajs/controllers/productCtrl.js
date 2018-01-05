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


        $scope.productDetails1 = {
            "brandId" : 1,
            "categoryId" : 1,
            "description" : "Delicious milk chocolate bar mixed with hazelnut for an added crunch",
            "id" : 1,
            "image" : "https://www.cadbury.com.au/admin/file/content2/c3/_0009_58011352_v1_DES_200G_HAZELNUT_BLOCK_2D.jpg",
            "name" : "Cadbury Hazelnut",
            "brandName": "Cadbury",
            "purchaseUrl": "https://www.cadbury.co.uk/"
          } 
  
    }
  ]);