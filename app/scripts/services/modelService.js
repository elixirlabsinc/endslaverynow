'use strict';

var ModelService = function() {
	this.brands = [];
	this.categories = [];
	this.products = [];

	this.parse = function parse(rawData) {
		this.brands = [];
		this.categories = [];
		this.products = [];
		var self = this;

		if (rawData.hasOwnProperty('brands')) {
			rawData.brands.forEach(
				function(brand) {
					self.brands.push(new Brand(brand));
				}
			);
		}

		if (rawData.hasOwnProperty('categories')) {
			rawData.categories.forEach(
				function(category) {
					self.categories.push(new Category(category));
				}
			);
		}

		if (rawData.hasOwnProperty('products')) {
			rawData.products.forEach(
				function(product) {
					self.products.push(new Product(product));
				}
			);
		}
	};

	this.getCategories = function getCategories() {
		return this.categories;
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
	};

	this.getBrandCategoriesForCategory = function getBrandCategoriesForCategory(sourceCategory) {
		return this.brands.filter(
			function (brand) {
				return brand.getCategoryIdAsArray().indexOf(sourceCategory.getId()) !== -1;
			}
		);
	};

	this.getCategoryProductsForCategory = function getCategoryProductsForCategory(sourceCategory) {
		return this.products.filter(
			function (product) {
				return product.getCategoryId() === sourceCategory.getId();
			}
		);
	};
};
