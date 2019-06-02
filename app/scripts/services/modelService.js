'use strict';

var ModelService = function() {
	this.categories = [];

	this.parse = function parse(rawData) {
		this.categories = [];
		if (rawData.hasOwnProperty('categories')) {
			var self = this;
			rawData.categories.forEach(
				function(category) {
					self.categories.push(
						new Category(category)
					);
				}
			);
		}
	};

	this.getCategoryById = function getCategoryById(categoryId) {
		categoryId = parseInt(categoryId);
		var matching = this.categories.filter(
			function(category) {
				return categoryId === category.getId();
			}
		);

		if (matching.length === 1) {
			return matching.shift(); // Take the first one (index not necessarily 0)
		}

		return null;
	};

	this.getRelatedCategoriesForCategory = function getRelatedCategoriesForCategory(sourceCategory) {
		return this.categories.filter(
			function (relatedCategory) {
				// Include if this category is the parent of the given category.
				if (sourceCategory.getParentCategoryId() === relatedCategory.getId()) {
					return true;
				}

				// Include if this category is a child or sibling of the given category
				if (sourceCategory.getId() === relatedCategory.getParentCategoryId() ||
					sourceCategory.getParentCategoryId() === relatedCategory.getParentCategoryId()) {
					if (sourceCategory.getId() !== relatedCategory.getId() &&
						relatedCategory.getParentCategoryId() !== 0) {
						return true;
					}
				}
			}
		);
	}
};
