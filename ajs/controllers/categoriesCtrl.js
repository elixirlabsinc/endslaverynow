angularApp.controller('CategoriesCtrl', [
    '$firebaseArray',
    '$firebaseObject',
    '$routeParams',
    '$scope',
    function($firebaseArray, $firebaseObject, $routeParams, $scope){
        
        $scope.loaded = false;
        $scope.allCategories = [];

        /* firebase */
        var firebase = new Firebase("https://end-slavery-now.firebaseio.com/aatest");
        var syncObject = $firebaseObject(firebase);

        syncObject.$loaded().then(function() {
            for(cat in syncObject.categories) {
                $scope.allCategories.push(syncObject.categories[cat]);
            }

            $scope.loaded = true;
        });
  
    }
  ]);