'use strict';

/**
 * This class handles the interface between the raw source data and the application. It exposes the raw data in
 * the form of models (and arrays of models). The "persist" methods write the data back to the data property in
 * the container that's passed in. The container is actually a scope object (controller) as it's the only way we
 * can bind to the raw data.
 *
 * @param dataContainer
 * @param syncObject
 * @param recordSets
 * @constructor
 */
var DataRepository = function (dataContainer, syncObject, recordSets) {
  this.syncObject = syncObject;
console.log('this.syncObject:', this.syncObject);
  this.recordSets = recordSets;
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
        function (brand) {
          self.brands.push(new Brand(brand));
        }
      );
    }

    if (this.syncObject.hasOwnProperty('categories')) {
      this.syncObject.categories.forEach(
        function (category) {
          self.categories.push(new Category(category));
        }
      );
    }

    if (this.syncObject.hasOwnProperty('products')) {
      this.syncObject.products.forEach(
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

  this.save = function save(collectionName, recordIndex, successMsg, callback) {
console.log('save (new style)...');
    this.recordSets[collectionName].$save(recordIndex).then(
      function () {
console.log('Success...');
        if (successMsg) {
          window.alert(successMsg);
        }
        if (callback) {
          callback();
        }
      },
      function (error) {
console.log('Error...', error);
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
    if (!brand.hasId()) {
console.log('Brand does not have an id');
      // This is an insert.
      brand.setId(this.generateNextBrandId());
      // @TODO: This will need to change.
      dataContainer.data.brands[brand.getId()] = {id: brand.getId()};
    }
    // Determine the index of the record in the array from the model's id.
    var brandIndex = this.determineIndexFromBrandModel(brand);
    // Create a reference to the object in the array, overwrite its values, and save it.
    var brandSource = this.recordSets.brands[brandIndex];
    brandSource.name = brand.getName();
    brandSource.description = brand.getDescription();
    brandSource.categories = brand.getCategoryIdAsCsl();
    brandSource.image = brand.getImage();
    brandSource.ranking = brand.getRanking();
    // brandSource.brandUrl = brand.getBrandURL(); // @TODO: There does not seem to be a URL property in the data.

    // Save this brand record.
    this.save('brands', brandIndex, successMsg, callback);
  };

  /**
   * Save the given category back to the data store.
   *
   * @param category {Category}
   * @param successMsg {string|null}
   * @param callback {Function|null}
   */
  this.persistCategory = function persistCategory(category, successMsg, callback) {
    if (!category.hasId()) {
console.log('Category does not have an id');
      // This is an insert.
      category.setId(this.generateNextCategoryId());
      // @TODO: This will need to change.
      dataContainer.data.categories[category.getId()] = {id: category.getId()};
    }
    // Determine the index of the record in the array from the model's id.
    var categoryIndex = this.determineIndexFromCategoryModel(category);
    // Create a reference to the object in the array, overwrite its values, and save it.
    var categorySource = this.recordSets.categories[categoryIndex];
    categorySource.description = category.getDescription();
    categorySource.image = category.getImage();
    categorySource.name = category.getName();
    categorySource.parentCategoryId = category.getParentCategoryId();

    // Save this category record.
    this.save('categories', categoryIndex, successMsg, callback);
  };

  /**
   * Save the given product back to the data store.
   *
   * @param product {Product}
   * @param successMsg
   * @param callback
   */
  this.persistProduct = function persistProduct(product, successMsg, callback) {
    if (!product.hasId()) {
console.log('Product does not have an id');
      // This is an insert.
      product.setId(this.generateNextProductId());
      // @TODO: This will need to change.
      dataContainer.data.products[product.getId()] = {id: product.getId()};
      // @TODO: Do we need to use .$add() for this type of operation?
    }
    // Determine the index of the record in the array from the model's id.
    var productIndex = this.determineIndexFromProductModel(product);
    // Create a reference to the object in the array, overwrite its values, and save it.
    var productSource = this.recordSets.products[productIndex];
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

    // Save this product record.
    this.save('products', productIndex, successMsg, callback);
  };

  this.generateNextBrandId = function generateNextBrandId() {
    var id = Math.max(1, dataContainer.data.brands.length);
    while (dataContainer.data.brands[id] !== undefined) {
      ++id;
    }
    return id;
  };

  this.generateNextCategoryId = function generateNextCategoryId() {
    var id = Math.max(1, dataContainer.data.categories.length);
    while (dataContainer.data.categories[id] !== undefined) {
      ++id;
    }
    return id;
  };

  this.generateNextProductId = function generateNextProductId() {
    var id = Math.max(1, dataContainer.data.products.length);
    while (dataContainer.data.products[id] !== undefined) {
      ++id;
    }
    return id;
  };

  this.determineIndexFromBrandModel = function determineIndexFromBrandModel(brandModel) {
    // Determine the index of the firebase array, using the brand model's id.
    var indexToDelete = null;
    this.recordSets.brands.forEach(function(brand, index) {
      if (brand.id === brandModel.getId()) {
        indexToDelete = index;
      }
    });

    return indexToDelete;
  };

  this.determineIndexFromCategoryModel = function determineIndexFromCategoryModel(categoryModel) {
    // Determine the index of the firebase array, using the category model's id.
    var indexToDelete = null;
    this.recordSets.categories.forEach(function(category, index) {
      if (category.id === categoryModel.getId()) {
        indexToDelete = index;
      }
    });

    return indexToDelete;
  };

  this.determineIndexFromProductModel = function determineIndexFromProductModel(productModel) {
    // Determine the index of the firebase array, using the product model's id.
    var indexToDelete = null;
    this.recordSets.products.forEach(function(product, index) {
      if (product.id === productModel.getId()) {
        indexToDelete = index;
      }
    });

    return indexToDelete;
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
