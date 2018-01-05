angularApp.controller('BrandCtrl', [
    '$firebaseArray',
    '$firebaseObject',
    '$routeParams',
    '$scope',
    function($firebaseArray, $firebaseObject, $routeParams, $scope){  
        /* firebase */
        var firebase = new Firebase("https://end-slavery-now.firebaseio.com/aatest");
        var syncObject = $firebaseObject(firebase);
        syncObject.$bindTo($scope, "esn");

        /**
         * TODO: 1. get the brandId from the path and display brand details
         *       2. Get the product details specifically related to this brand id
         *          - link to product detail
         *          - find a better way to find them other than loading all products everytime
         *       3. display product details
         */

        $scope.brandId = $routeParams.id;

        $scope.brandDetails = {
            "description" : "Cadbury chocolates are based out of the UK and are absolutely delicious",
            "id" : 1,
            "image" : "https://vignette.wikia.nocookie.net/logopedia/images/9/9b/Cadbury_logo.svg/revision/latest?cb=20100111121243",
            "name" : "Cadbury",
            "ranking" : "Best",
            "brandURL": "https://www.cadbury.co.uk/"
          }
  
    }
  ]);