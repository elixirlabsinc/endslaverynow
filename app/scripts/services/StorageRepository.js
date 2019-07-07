'use strict';

var StorageRepository = function (firebase) {
  this.storage = firebase.storage;
  this.storageFunc = firebase.storage();
  this.storageRef = this.storageFunc.ref();

  const uploadFolderNames = {
    brand: 'Brand',
    category: 'Category',
    product: 'Product'
  };

  this.extractLatestImage = function extractLatestImage(imageData) {
    // imageData is an array of file uploads. We want to return an array containing just the last one.
    // If it's not an array, just return it unchanged.
    // @TODO: This is to work around a possible bug in the forms where if the user clicks to choose an image,
    // @TODO: chooses one, then clicks again and chooses another, the image property of the controller contains
    // @TODO: an array of two images, which then doesn't get saved properly. This makes sure the last image
    // @TODO: to be chosen is saved.
    if (Array.isArray(imageData)) {
      // Take the last element of the array, create an array with that as the only element, and return it.
      return [imageData.pop()];
    } else {
      return imageData;
    }
  };

  this.getImageUploadFolderNames = function getImageUploadFolderNames() {
    return uploadFolderNames;
  };

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
      function (snapshot) {
      },
      function (error) {
        // catch an error when it happens, note: there are more error codes
        switch (error.code) {
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
      function () {
        // on success, call any callback function, passing in the image URL.
        if (callback) {
          var newUrl = uploadTask.snapshot.downloadURL;
          callback(newUrl);
        }
      });
  };
};
