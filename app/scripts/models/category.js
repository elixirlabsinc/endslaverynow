'use strict';

var Category = (function () {

	var Category = function Category(data) {
		this.description = data.hasOwnProperty('description') ? data.description : null;
		this.id = data.hasOwnProperty('id') ? parseInt(data.id) : null;
		this.image = data.hasOwnProperty('image') ? data.image : null;
		this.name = data.hasOwnProperty('name') ? data.name : null;
		this.parentCategoryId = data.hasOwnProperty('parentCategoryId') ? parseInt(data.parentCategoryId) : null;
	};

	Category.prototype = {
		getId: function getId() {
			return this.id;
		},

		hasName: function hasName() {
			return this.name !== null;
		},

		getName: function getName() {
			return this.name;
		},

		getDescription: function getDescription() {
			return this.description;
		},

		hasImage: function hasImage() {
			return this.image !== null;
		},

		getImage: function getImage() {
			return this.image;
		},

		getParentCategoryId: function getParentCategoryId() {
			return this.parentCategoryId;
		},

		hasParentCategory: function hasParentCategory() {
			return this.getParentCategoryId() > 0;
		}
	};

	return Category;

}());
