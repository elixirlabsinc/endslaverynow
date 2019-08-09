'use strict';

/**
 * This class handles the interface between the raw source data and the application. It exposes the raw data in
 * the form of models (and arrays of models). The "persist" methods write the data back to the data property in
 * the container that's passed in.
 *
 * @param recordSets
 * @constructor
 */
var DataRepository = function (recordSets) {
  this.recordSets = recordSets;
  this.brands = [];
  this.categories = [];
  this.products = [];
  const collectionNames = {
    brands: 'brands',
    categories: 'categories',
    products: 'products'
  };

  this.init = function init() {
    this.brands = [];
    this.categories = [];
    this.products = [];
    this.certifications = []; // @TODO: There doesn't seem to be any certification data, so we don't try to load it.
    var self = this;

    if (this.recordSets.hasOwnProperty(collectionNames.brands)) {
      this.recordSets.brands.forEach(
        function (brand) {
          self.brands.push(new Brand(brand));
        }
      );
    }

    if (this.recordSets.hasOwnProperty(collectionNames.categories)) {
      this.recordSets.categories.forEach(
        function (category) {
          self.categories.push(new Category(category));
        }
      );
    }

    if (this.recordSets.hasOwnProperty(collectionNames.products)) {
      this.recordSets.products.forEach(
        function (product) {
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
      function (category) {
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
      function (brand) {
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
      function (product) {
        return productId === product.getId();
      }
    );

    if (matching.length === 1) {
      return matching.shift(); // Take the first one (index not necessarily 0)
    }

    return null;
  };

  this.insert = function insert(collectionName, record, successMsg, callback) {
    this.recordSets[collectionName].$add(record).then(
      function () {
        if (successMsg) {
          window.alert(successMsg);
        }
        if (callback) {
          callback();
        }
      },
      function (error) {
        window.alert('Error: ' + error.toString());
      }
    );
  };

  this.update = function update(collectionName, recordIndex, successMsg, callback) {
    this.recordSets[collectionName].$save(recordIndex).then(
      function () {
        if (successMsg) {
          window.alert(successMsg);
        }
        if (callback) {
          callback();
        }
      },
      function (error) {
        window.alert('Error: ' + error.toString());
      }
    );
  };

  this.populateRecordFromBrandModel = function populateRecordFromBrandModel(brandRecord, brand) {
    brandRecord.name = brand.getName();
    brandRecord.description = brand.getDescription();
    brandRecord.categories = brand.getCategoryIdAsCsl();
    brandRecord.image = brand.getImage();
    brandRecord.ranking = brand.getRanking();
    // brandRecord.brandUrl = brand.getBrandURL(); // @TODO: There does not seem to be a URL property in the data.
  };

  this.populateRecordFromCategoryModel = function populateRecordFromCategoryModel(categoryRecord, category) {
    categoryRecord.description = category.getDescription();
    categoryRecord.image = category.getImage();
    categoryRecord.name = category.getName();
    categoryRecord.parentCategoryId = category.getParentCategoryId();
  };

  this.populateRecordFromProductModel = function populateRecordFromProductModel(productRecord, product) {
    productRecord.brandId = product.getBrandId();
    productRecord.categoryId = product.getCategoryId();
    productRecord.description = product.getDescription();
    productRecord.id = product.getId();
    productRecord.image = product.getImage();
    productRecord.name = product.getName();
    productRecord.parentCategoryId = product.getParentCategoryId();
    productRecord.purchaseURlClicks = product.getPurchaseUrlClicks();
    productRecord.purchaseUrl = product.getPurchaseUrl();
    // productRecord.$$hashKey = product.$$hashKey(); @TODO: Do we save this? When does it change?
  };

  /**
   * Save the given brand back to the data store.
   *
   * @param brand {Brand}
   * @param successMsg {string|null}
   * @param callback {Function|null}
   */
  this.persistBrand = function persistBrand(brand, successMsg, callback) {
    if (brand.hasId()) {

      // This is an update.
      // Determine the index of the record in the array from the model's id.
      var brandIndex = this.determineIndexFromBrandModel(brand);
      // Create a reference to the object in the array.
      var brandSource = this.recordSets.brands[brandIndex];
      // Overwrite the record with the values from the model.
      this.populateRecordFromBrandModel(brandSource, brand);
      // Save the record back to the store.
      this.update(collectionNames.brands, brandIndex, successMsg, callback);

    } else {

      // This is an insert. Generate a new id and start a new object.
      brand.setId(this.generateNextBrandId());
      var newBrand = {
        id: brand.getId()
      };
      // Populate the record with the values from the model.
      this.populateRecordFromBrandModel(newBrand, brand);
      // Create the record in the store.
      this.insert(collectionNames.brands, newBrand, successMsg, callback);

    }
  };

  /**
   * Save the given category back to the data store.
   *
   * @param category {Category}
   * @param successMsg {string|null}
   * @param callback {Function|null}
   */
  this.persistCategory = function persistCategory(category, successMsg, callback) {
    if (category.hasId()) {

      // This is an update.
      // Determine the index of the record in the array from the model's id.
      var categoryIndex = this.determineIndexFromCategoryModel(category);
      // Create a reference to the object in the array.
      var categorySource = this.recordSets.categories[categoryIndex];
      // Overwrite the record with the values from the model.
      this.populateRecordFromCategoryModel(categorySource, category);
      // Save the record back to the store.
      this.update(collectionNames.categories, categoryIndex, successMsg, callback);

    } else {

      // This is an insert. Generate a new id and start a new object.
      category.setId(this.generateNextCategoryId());
      var newCategory = {
        id: category.getId()
      };
      // Populate the record with the values from the model.
      this.populateRecordFromCategoryModel(newCategory, category);
      // Create the record in the store.
      this.insert(collectionNames.categories, newCategory, successMsg, callback);

    }
  };

  /**
   * Save the given product back to the data store.
   *
   * @param product {Product}
   * @param successMsg
   * @param callback
   */
  this.persistProduct = function persistProduct(product, successMsg, callback) {
    if (product.hasId()) {

      // This is an update.
      // Determine the index of the record in the array from the model's id.
      var productIndex = this.determineIndexFromProductModel(product);
      // Create a reference to the object in the array.
      var productSource = this.recordSets.products[productIndex];
      // Overwrite the record with the values from the model.
      this.populateRecordFromProductModel(productSource, product);
      // Save the record back to the store.
      this.update(collectionNames.products, productIndex, successMsg, callback);

    } else {

      // This is an insert. Generate a new id and start a new object.
      product.setId(this.generateNextProductId());
      var newProduct = {
        id: product.getId()
      };
      // Populate the record with the values from the model.
      this.populateRecordFromProductModel(newProduct, product);
      // Create the record in the store.
      this.insert(collectionNames.products, newProduct, successMsg, callback);

    }
  };

  this.generateNextBrandId = function generateNextBrandId() {
    var id = 0;
    this.recordSets.brands.forEach(function (brand) {
      id = Math.max(id, brand.id);
    });
    ++id;

    return id;
  };

  this.generateNextCategoryId = function generateNextCategoryId() {
    var id = 0;
    this.recordSets.categories.forEach(function (category) {
      id = Math.max(id, category.id);
    });
    ++id;

    return id;
  };

  this.generateNextProductId = function generateNextProductId() {
    var id = 0;
    this.recordSets.products.forEach(function (product) {
      id = Math.max(id, product.id);
    });
    ++id;

    return id;
  };

  this.determineIndexFromBrandModel = function determineIndexFromBrandModel(brandModel) {
    // Determine the index of the firebase array, using the brand model's id.
    var brandIndex = null;
    this.recordSets.brands.forEach(function(brand, index) {
      if (brand.id === brandModel.getId()) {
        brandIndex = index;
      }
    });

    return brandIndex;
  };

  this.determineIndexFromCategoryModel = function determineIndexFromCategoryModel(categoryModel) {
    // Determine the index of the firebase array, using the category model's id.
    var categoryIndex = null;
    this.recordSets.categories.forEach(function(category, index) {
      if (category.id === categoryModel.getId()) {
        categoryIndex = index;
      }
    });

    return categoryIndex;
  };

  this.determineIndexFromProductModel = function determineIndexFromProductModel(productModel) {
    // Determine the index of the firebase array, using the product model's id.
    var productIndex = null;
    this.recordSets.products.forEach(function(product, index) {
      if (product.id === productModel.getId()) {
        productIndex = index;
      }
    });

    return productIndex;
  };

  /**
   * @TODO: Presumably we should update any references to this brand (or prevent delete if anything references it)?
   * @TODO: And what about uploaded images? Should they be deleted? What if something else is referencing it?
   *
   * @param {Brand} brandModel
   * @param callback
   */
  this.deleteBrand = function deleteBrand(brandModel, callback) {
    // Determine the index of the firebase array, using the brand model's id.
    var indexToDelete = this.determineIndexFromBrandModel(brandModel);
    if (indexToDelete !== null) {
      // We found it, so delete it. If the delete was successful, run the callback function.
      this.recordSets.brands.$remove(indexToDelete).then(function () {
        callback();
      }).catch(function (error) {
          console.log("Error deleting brand: ", error);
        }
      );
    }
  };

  /**
   * @TODO: Presumably we should update any references to this category (or prevent delete if anything references it)?
   * @TODO: And what about uploaded images? Should they be deleted? What if something else is referencing it?
   *
   * @param {Category} categoryModel
   * @param callback
   */
  this.deleteCategory = function deleteCategory(categoryModel, callback) {
    // Determine the index of the firebase array, using the category model's id.
    var indexToDelete = this.determineIndexFromCategoryModel(categoryModel);
    if (indexToDelete !== null) {
      // We found it, so delete it. If the delete was successful, run the callback function.
      this.recordSets.categories.$remove(indexToDelete).then(function () {
        callback();
      }).catch(function (error) {
          console.log("Error deleting category: ", error);
        }
      );
    }
  };

  /**
   * @TODO: Presumably we should update any references to this product (or prevent delete if anything references it)?
   * @TODO: And what about uploaded images? Should they be deleted? What if something else is referencing it?
   *
   * @param {Product} productModel
   * @param callback
   */
  this.deleteProduct = function deleteProduct(productModel, callback) {
    // Determine the index of the firebase array, using the product model's id.
    var indexToDelete = this.determineIndexFromProductModel(productModel);
    if (indexToDelete !== null) {
      // We found it, so delete it. If the delete was successful, run the callback function.
      this.recordSets.products.$remove(indexToDelete).then(function () {
        callback();
      }).catch(function (error) {
          console.log("Error deleting product: ", error);
        }
      );
    }
  };
};
