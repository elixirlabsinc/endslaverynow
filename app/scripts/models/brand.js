'use strict';

var Brand = (function () {

	var Brand = function Brand(data) {
		this.categoryIdsCsl = data.hasOwnProperty('categories') ? data.categories : null;
		this.description = data.hasOwnProperty('description') ? data.description : null;
		this.id = data.hasOwnProperty('id') ? parseInt(data.id) : null;
		this.image = data.hasOwnProperty('image') ? data.image : null;
		this.name = data.hasOwnProperty('name') ? data.name : null;
		this.ranking = data.hasOwnProperty('ranking') ? data.ranking : null;

		// Convert the category ids CSL to an array and remember it.
		this.categoryIds = this.categoryIdsCsl === null ? [] : String(this.categoryIdsCsl).split(',');
	};

	Brand.prototype = {
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

		getCategoryIdAsArray: function getCategoryIdAsArray() {
			return this.categoryIds;
		}
	};

	return Brand;

}());
