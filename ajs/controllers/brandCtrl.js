angularApp.controller('BrandCtrl', [
    '$firebaseArray',
    '$firebaseObject',
    '$routeParams',
    '$scope',
    function($firebaseArray, $firebaseObject, $routeParams, $scope){
        
        $scope.brandId = $routeParams.id;
        $scope.loaded = false;
        $scope.brandProducts = [];

        /* firebase */
        var firebase = new Firebase("https://end-slavery-now.firebaseio.com/aatest");
        var syncObject = $firebaseObject(firebase);

        syncObject.$loaded().then(function() {
            // Get brand information
            $scope.brandDetails = syncObject.brands[$scope.brandId];

            if($scope.brandDetails == null) {
                return
            }

            // Get products for this brand
            for(prod in syncObject.products) {
                var temp = syncObject.products[prod];
                if(temp.brandId == $scope.brandId) {
                    $scope.brandProducts.push(temp);
                }
            }

            $scope.loaded = true;
        });

        /**
         * TODO: 1. get the brandId from the path and display brand details
         *       2. Get the product details specifically related to this brand id
         *          - link to product detail
         *          - find a better way to find them other than loading all products everytime
         *       3. display product details
         */
  
    }
  ]);