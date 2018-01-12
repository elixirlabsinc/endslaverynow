angularApp.controller('CategoryCtrl', [
    '$firebaseArray',
    '$firebaseObject',
    '$routeParams',
    '$scope',
    function($firebaseArray, $firebaseObject, $routeParams, $scope){
        
        $scope.categoryId = $routeParams.id;
        $scope.loaded = false;
        $scope.categoryBrands = [];
        $scope.categoryProducts = [];
        $scope.relatedCategories = [];

        /* firebase */
        var firebase = new Firebase("https://end-slavery-now.firebaseio.com/aatest");
        var syncObject = $firebaseObject(firebase);

        syncObject.$loaded().then(function() {
            // Get brand information
            $scope.categoryDetails = syncObject.categories[$scope.categoryId];

            if($scope.categoryDetails == null) {
                return
            }

            // if($scope.categoryDetails.parentCategoryId != 0) {
                // Check if current category is a child
                // $scope.relatedCategories.push(syncObject.categories[$scope.categoryDetails.parentCategoryId]);
            // } else {
                for(cat in syncObject.categories) {
                    if(syncObject.categories[cat].id == $scope.categoryDetails.parentCategoryId) {
                        $scope.relatedCategories.push(syncObject.categories[cat]);
                    }
                    if (syncObject.categories[cat].parentCategoryId == $scope.categoryId ||
                        syncObject.categories[cat].parentCategoryId == $scope.categoryDetails.parentCategoryId
                    ) {
                        if(syncObject.categories[cat].id != $scope.categoryId && syncObject.categories[cat].parentCategoryId != 0) {
                            $scope.relatedCategories.push(syncObject.categories[cat]);
                        }
                    }
                }
            // }

            for(brand in syncObject.brands) {
                var temp = syncObject.brands[brand];
                $scope.brandCategories = temp.categories.split(",");
                for(catId in $scope.brandCategories) {
                    if($scope.brandCategories[catId] == $scope.categoryId) {
                        $scope.categoryBrands.push(temp);
                    }
                }
            }

            for(product in syncObject.products) {
                var temp = syncObject.products[product];
                if(temp.categoryId == $scope.categoryId) {
                    $scope.categoryProducts.push(temp);
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