'use strict';

var DataRepository = function(syncObject) {
	this.brands = [];
	this.categories = [];
	this.products = [];

	this.parse = function parse(rawData) {
		this.brands = [];
		this.categories = [];
		this.products = [];
		this.certifications = []; // @TODO: There doesn't seem to be any certification data, so we don't try to load it.
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

	this.parse(syncObject);

	this.getCategories = function getCategories() {
		return this.categories;
	};

	// Note: at the moment, this.certifications will always be an empty array.
	this.getCertifications = function getCertifications() {
		return this.certifications;
	};

	this.getTopLevelCategories = function getTopLevelCategories() {
		return this.categories.filter(
			function (category) {
				return !category.hasParentCategory();
			}
		);
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

	this.getBrandById = function getBrandById(brandId) {
		brandId = parseInt(brandId);
		var matching = this.brands.filter(
			function(brand) {
				return brandId === brand.getId();
			}
		);

		if (matching.length === 1) {
			return matching.shift(); // Take the first one (index not necessarily 0)
		}

		return null;
	};

	this.getBrandProductsForBrand = function getBrandProductsForBrand(sourceBrand) {
		return this.products.filter(
			function (product) {
				return product.getBrandId() === sourceBrand.getId();
			}
		);
	};

	this.getRelatedCategoriesForBrand = function getRelatedCategoriesForBrand(sourceBrand) {
		var result = [];
		var self = this;
		sourceBrand.getCategoryIdAsArray().forEach(
			function (categoryId) {
				result.push(self.getCategoryById(categoryId));
			}
		);

		return result;
	};

	this.getProductById = function getProductById(productId) {
		productId = parseInt(productId);
		var matching = this.products.filter(
			function(product) {
				return productId === product.getId();
			}
		);

		if (matching.length === 1) {
			return matching.shift(); // Take the first one (index not necessarily 0)
		}

		return null;
	};

	this.persistProduct = function persistProduct(product) {
		alert('This has not been implemented yet!');
		// @TODO: Finish this. When updating the number of clicks, it did this:
		// $scope.data.products[$scope.productId].purchaseURlClicks = updatedClickCount
	};
};
