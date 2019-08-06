'use strict';

var DataRepositoryFactory = function ($firebaseObject, $firebaseArray) {
  var db = firebase.database();
  this.syncObject = $firebaseObject(db.ref());
  this.recordSets = {
    brands: $firebaseArray(db.ref('brands')),
    categories: $firebaseArray(db.ref('categories')),
    products: $firebaseArray(db.ref('products'))
  };

  this.dataRepository = null;
  this.storageRepository = new StorageRepository(firebase);

  this.$scope = null;

  /**
   * This method waits until the firebase object has been initialised, and then constructs a new data repository
   * with it, passing in the scope, and then passes that in to the callback function provided by the calling code.
   *
   * @param $scope
   * @param callback
   */
  this.ready = function ready($scope, callback) {
    var self = this;

    self.$scope = $scope;

    this.syncObject.$loaded().then(function () {
      self.dataRepository = new DataRepository($scope, self.recordSets);
      // @TODO: We should probably check that "callback" is defined and is a function.
      callback();
    });
  };

  this.getDataRepository = function getDataRepository() {
    // @TODO: We should fail this if the data repository hasn't been initialised.
    return this.dataRepository;
  };

  this.getStorageRepository = function getStorageRepository() {
    return this.storageRepository;
  };
};
