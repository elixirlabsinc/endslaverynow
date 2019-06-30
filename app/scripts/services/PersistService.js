'use strict';

/**

 * @param {DataRepositoryFactory} dataRepositoryFactory
 * @param {DataRepository} dataRepository
 * @param {StorageRepository} storageRepository
 * @constructor
 */
var PersistService = function(dataRepositoryFactory, dataRepository, storageRepository) {
	this.dataRepository = dataRepository;
	this.storageRepository = storageRepository;

	// Basically, these methods save the model, then call the callback function.
	// However, before they save the model, they check whether the image in the model is an upload, and if so,
	// it uploads the image, gets the image URL, puts it in the model, and then goes on to save the model.
	// It's complicated because uploading images and saving models are both asynchronous, but we have to do
	// everything in order and as if it were synchronous.

	this.processBrand = function processBrand(brand, message, callback) {
		var localBrand = brand;
		// Build the process that will persist the brand (mainly so we don't have to duplicate fairly complex code).
		var self = this;
		var doPersist = function doPersist() {
			dataRepositoryFactory.bind();
			self.dataRepository.persistBrand(localBrand, message, callback);
		};

		if (localBrand.isImageAnUpload()) {
			// The image is an upload, so upload it, get the URL
			this.storageRepository.uploadImageInModel(
				localBrand.getImage(),
				localBrand.getImageUploadFolder(),
				function (downloadURL) {
					localBrand.setImage(downloadURL);
					doPersist();
				}
			);
		} else {
			doPersist();
		}
	};

	this.processCategory = function processCategory(category, callback) {

	};

	this.processProduct = function processProduct(product, callback) {

	};

};
