'use strict';

var DataRepositoryFactory = function ($firebaseObject) {
	this.$firebaseObject = $firebaseObject;

	var ref = firebase.database().ref();
	this.syncObject = this.$firebaseObject(ref);

	/**
	 * This method binds the sync object to the "data" property of the scope object. Unfortunately, you can only
	 * bind to a controller ($scope), otherwise we could just use the repository class or whatever.
	 * It then waits until the firebase object has been initialised, and then constructs a new data repository
	 * with it, passing in the scope, and then passes that in to the callback function provided by the calling code.
	 * @TODO: I wonder if the scope could be passed in at the same time as $firebaseObject. Depends on whether it exists at that point.
	 *
	 * @param $scope
	 * @param callback
	 */
	this.ready = function ready($scope, callback) {

		this.syncObject.$bindTo($scope, 'data');

		var self = this;
		this.syncObject.$loaded().then(function() {
			// @TODO: We should probably check that "callback" is defined and is a function.
			callback(new DataRepository($scope, self.syncObject));
		});
	};
};
