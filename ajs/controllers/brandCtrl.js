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
            console.log('data is loaded');
            console.log(syncObject.products);

            for(prod in syncObject.products) {
                var temp = syncObject.products[prod];
                console.log(temp.name);
                if(temp.brandId == $scope.brandId) {
                    $scope.brandProducts.push(temp);
                }
            }

            $scope.loaded = true;
        });

        syncObject.$bindTo($scope, "esn");

        /**
         * TODO: 1. get the brandId from the path and display brand details
         *       2. Get the product details specifically related to this brand id
         *          - link to product detail
         *          - find a better way to find them other than loading all products everytime
         *       3. display product details
         */

        $scope.brandDetails = {
            "description" : "Cadbury chocolates are based out of the UK and are absolutely delicious",
            "id" : 1,
            "image" : "https://vignette.wikia.nocookie.net/logopedia/images/9/9b/Cadbury_logo.svg/revision/latest?cb=20100111121243",
            "name" : "Cadbury",
            "ranking" : "Best",
            "brandURL": "https://www.cadbury.co.uk/"
        }

        

        // $scope.brandProducts = getBrandProducts();
  
    }
  ]);