'use strict';

var DataRepositoryFactory = function ($firebaseObject) {
  var ref = firebase.database().ref();
  this.syncObject = $firebaseObject(ref);

  this.dataRepository = null;
  this.storageRepository = new StorageRepository(firebase);

  this.$scope = null;
  this.bind = function bind() {
    if (this.$scope) {
      this.syncObject.$bindTo(this.$scope, 'data');
    }
  };

  /**
   * This method binds the sync object to the "data" property of the scope object. Unfortunately, you can only
   * bind to a controller ($scope), otherwise we could just use the repository class or whatever.
   * It then waits until the firebase object has been initialised, and then constructs a new data repository
   * with it, passing in the scope, and then passes that in to the callback function provided by the calling code.
   *
   * @param $scope
   * @param callback
   */
  this.ready = function ready($scope, callback) {
    var self = this;

    self.$scope = $scope;
    self.bind();

    this.syncObject.$loaded().then(function () {
      // @TODO: I'm not sure if this block is needed, or what it's trying to do, because it always seems
      // @TODO: to fire as soon as the controller loads.
      self.syncObject.$save().then(
        function () {
          console.log('Done'); // true
        },
        function (error) {
          console.log('Error:', error);
        }
      );

      self.dataRepository = new DataRepository($scope, self.syncObject);
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
