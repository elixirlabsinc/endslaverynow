'use strict';

var StorageRepository = function(firebase) {
	this.storage = firebase.storage;
	this.storageFunc = firebase.storage();
	this.storageRef = this.storageFunc.ref();

	/**
	 * @param {Array} imageData
	 * @param {string} targetFolder
	 * @param callback
	 */
	this.uploadImageInModel = function uploadImageInModel(imageData, targetFolder, callback) {
		// set file metadata
		var metadata = {
			contentType: 'image/jpeg'
		};

		// use Firebase push call to upload file to Firebase
		var file = imageData[0];
		var uploadTask = this.storageRef.child(targetFolder + '/images/' + file.name).put(file, metadata);

		// monitor Firebase upload progress and catch errors
		uploadTask.on(
			this.storage.TaskEvent.STATE_CHANGED,
			function(snapshot) {
			},
			function(error) {
				// catch an error when it happens, note: there are more error codes
				switch(error.code) {
					case 'storage/bucket_not_found':
						console.log('The Bucket for this storage could not be found');
						break;
					case 'storage/unauthorized':
						console.log('User doesn\'t have access');
						break;
					case 'storage/cancelled':
						console.log('User cancelled the upload process');
						break;
					case 'storage/unknown':
						console.log('Unknown error');
						break;
				}
				return;
			},
			function() {
				// on success, call any callback function, passing in the image URL.
				if (callback) {
					var newUrl = uploadTask.snapshot.downloadURL;
					callback(newUrl);
				}
			});
	};
};
