'use strict';

/**
 * This class handles the interface between the raw source data and the application. It exposes the raw data in
 * the form of models (and arrays of models). The "persist" methods write the data back to the data property in
 * the container that's passed in. The container is actually a scope object (controller) as it's the only way we
 * can bind to the raw data.
 *
 * @param dataContainer
 * @param syncObject
 * @constructor
 */
var DataRepository = function(dataContainer, syncObject) {
	this.syncObject = syncObject;
	this.brands = [];
	this.categories = [];
	this.products = [];

	this.init = function init() {
		this.brands = [];
		this.categories = [];
		this.products = [];
		this.certifications = []; // @TODO: There doesn't seem to be any certification data, so we don't try to load it.
		var self = this;

		if (this.syncObject.hasOwnProperty('brands')) {
			this.syncObject.brands.forEach(
				function(brand) {
					self.brands.push(new Brand(brand));
				}
			);
		}

		if (this.syncObject.hasOwnProperty('categories')) {
			this.syncObject.categories.forEach(
				function(category) {
					self.categories.push(new Category(category));
				}
			);
		}

		if (this.syncObject.hasOwnProperty('products')) {
			this.syncObject.products.forEach(
				function(product) {
					self.products.push(new Product(product));
				}
			);
		}
	};

	this.init();

	this.getBrands = function getBrands() {
		return this.brands;
	};

	this.getCategories = function getCategories() {
		return this.categories;
	};

	this.getProducts = function getProducts() {
		return this.products;
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

	this.save = function save(successMsg, callback) {
		this.syncObject.$save().then(
			function() {
				if (successMsg) {
					window.alert(successMsg);
				}
				if (callback) {
					callback();
				}
			},
			function(error) {
				window.alert('Error: ' + error.toString());
			}
		);
	};

	/**
	 * Save the given brand back to the data store.
	 *
	 * @param brand {Brand}
	 * @param successMsg {string|null}
	 * @param callback {Function|null}
	 */
	this.persistBrand = function persistBrand(brand, successMsg, callback) {
		// @TODO: We need to handle this being a new brand.
		var brandSource = dataContainer.data.brands[brand.getId()];
		brandSource.name = brand.getName();
		brandSource.description = brand.getDescription();
		brandSource.categories = brand.getCategoryIdAsCsl();
		brandSource.image = brand.getImage();
		brandSource.ranking = brand.getRanking();
		// brandSource.brandUrl = brand.getBrandURL(); // @TODO: There does not seem to be a URL property in the data.
		this.save(successMsg, callback);
	};

	/**
	 * Save the given product back to the data store.
	 *
	 * @param product {Product}
	 */
	this.persistProduct = function persistProduct(product) {
		// @TODO: We need to handle this being a new product.
		var productSource = dataContainer.data.products[product.getId()];
		productSource.brandId = product.getBrandId();
		productSource.categoryId = product.getCategoryId();
		productSource.description = product.getDescription();
		productSource.id = product.getId();
		productSource.image = product.getImage();
		productSource.name = product.getName();
		productSource.parentCategoryId = product.getParentCategoryId();
		productSource.purchaseURlClicks = product.getPurchaseUrlClicks();
		productSource.purchaseUrl = product.getPurchaseUrl();
		// productSource.$$hashKey = product.$$hashKey(); @TODO: Do we save this? When does it change?
		this.save(null);
	};
};
