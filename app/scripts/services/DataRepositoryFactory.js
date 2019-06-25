'use strict';

var DataRepositoryFactory = function ($firebaseObject) {
	var ref = firebase.database().ref();
	this.syncObject = $firebaseObject(ref);

	this.dataRepository = null;

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

		this.syncObject.$bindTo($scope, 'data');

		var self = this;
		this.syncObject.$loaded().then(function() {
			self.dataRepository = new DataRepository($scope, self.syncObject);
			// @TODO: We should probably check that "callback" is defined and is a function.
			callback();
		});
	};

	this.getDataRepository = function getDataRepository() {
		// @TODO: We should fail this if the data repository hasn't been initialised.
		return this.dataRepository;
	};
};
