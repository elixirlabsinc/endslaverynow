'use strict';

var DataRepositoryFactory = function ($firebaseObject) {
	this.$firebaseObject = $firebaseObject;

	/**
	 * This method waits until the firebase object has been initialised, and then constructs a new data
	 * repository with it, and passes that in to the callback function provided by the calling code.
	 *
	 * @param callback
	 */
	this.ready = function ready(callback) {
		var ref = firebase.database().ref();
		var syncObject = this.$firebaseObject(ref);

		syncObject.$loaded().then(function() {
			// @TODO: We should probably check that "callback" is defined and is a function.
			callback(new DataRepository(syncObject));
		});
	};
};
