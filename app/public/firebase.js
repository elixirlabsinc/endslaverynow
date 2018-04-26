var uploadImages = function(data, config, uploadType) {
  var file = data.image[0];

  if(!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  var storage = firebase.storage();
  var storageRef = storage.ref();

  // set file metadata
  var metadata = {
      contentType: 'image/jpeg'
  };

  // use Firebase push call to upload file to Firebase
  var uploadTask = storageRef.child(uploadType + '/images/' + file.name).put(file, metadata);

  // monitor Firebase upload prodress and catch errors
  var uploadedImageUrl = uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
    function(snapshot) {
    }, function(error) {
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
    }, function() {
        // on success, display the uploaded image on the page
        var downloadURL = uploadTask.snapshot.downloadURL;
        data.image = downloadURL;
        writeNewPost(data, uploadType);

        var addForm = document.getElementById('add-form');
        addForm.style.display = 'none';
        var successMessage = document.getElementById('submitted-form');
        successMessage.style.display = 'block';
    });

}

function writeNewPost(data, uploadType) {
  var updates = {};
  updates['/' + uploadType + '/' + data.id] = data;
  return firebase.database().ref().update(updates);
}