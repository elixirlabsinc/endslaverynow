'use strict';

var Product = (function () {

	var Product = function Product(data) {
		this.brandId = data.hasOwnProperty('brandId') ? parseInt(data.brandId) : null;
		this.categoryId = data.hasOwnProperty('categoryId') ? parseInt(data.categoryId) : null;
		this.description = data.hasOwnProperty('description') ? data.description : null;
		this.id = data.hasOwnProperty('id') ? parseInt(data.id) : null;
		this.image = data.hasOwnProperty('image') ? data.image : null;
		this.name = data.hasOwnProperty('name') ? data.name : null;
		this.parentCategoryId = data.hasOwnProperty('parentCategoryId') ? parseInt(data.parentCategoryId) : null;
		this.purchaseURlClicks = data.hasOwnProperty('purchaseURlClicks') ? data.purchaseURlClicks : null;
		this.purchaseUrl = data.hasOwnProperty('purchaseUrl') ? data.purchaseUrl : null;
		this.$$hashKey = data.hasOwnProperty('$$hashKey') ? data.$$hashKey : null;
	};

	Product.prototype = {
		getId: function getId() {
			return this.id;
		},

		getName: function getName() {
			return this.name;
		},

		hasImage: function hasImage() {
			return this.image !== null;
		},

		getImage: function getImage() {
			return this.image;
		},

		getCategoryId: function getCategoryId() {
			return this.categoryId;
		},

		getBrandId: function getBrandId() {
			return this.brandId;
		},

		hasPurchaseUrl: function hasPurchaseUrl() {
			return this.purchaseUrl !== null;
		},

		getPurchaseUrl: function getPurchaseUrl() {
			return this.purchaseUrl;
		},

		incrementPurchaseUrlClicks: function incrementPurchaseUrlClicks() {
			++this.purchaseURlClicks;
		}
	};

	return Product;

}());
