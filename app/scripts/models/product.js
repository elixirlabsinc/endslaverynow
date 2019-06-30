'use strict';

var Product = (function () {

  // @TODO: Get these properties and the getters/setters into a sensible order.
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

    hasId: function hasId() {
      return this.id !== null;
    },

    setId: function setId(newId) {
      this.id = newId;
    },

    getName: function getName() {
      return this.name;
    },

    setName: function setName(name) {
      this.name = name;
    },

    hasImage: function hasImage() {
      return this.image !== null;
    },

    getImage: function getImage() {
      return this.image;
    },

    setImage: function setImage(image) {
      this.image = image;
    },

    getImageUploadFolder: function getImageUploadFolder() {
      return 'Product';
    },

    isImageAnUpload: function isImageAnUpload() {
      // @TODO: This needs do more checks, really.
      return Array.isArray(this.image) && this.image.length === 1;
    },

    getCategoryId: function getCategoryId() {
      return this.categoryId;
    },

    setCategoryId: function setCategoryId(categoryId) {
      this.categoryId = categoryId;
    },

    getBrandId: function getBrandId() {
      return this.brandId;
    },

    setBrandId: function setBrandId(brandId) {
      this.brandId = brandId;
    },

    hasPurchaseUrl: function hasPurchaseUrl() {
      return this.purchaseUrl !== null;
    },

    getPurchaseUrl: function getPurchaseUrl() {
      return this.purchaseUrl;
    },

    setPurchaseUrl: function setPurchaseUrl(purchaseUrl) {
      this.purchaseUrl = purchaseUrl;
    },

    incrementPurchaseUrlClicks: function incrementPurchaseUrlClicks() {
      ++this.purchaseURlClicks;
    },

    getPurchaseUrlClicks: function getPurchaseUrlClicks() {
      return this.purchaseURlClicks;
    },

    getDescription: function getDescription() {
      return this.description;
    },

    setDescription: function setDescription(description) {
      this.description = description;
    },

    getParentCategoryId: function getParentCategoryId() {
      return this.parentCategoryId;
    },

    getRanking: function getRanking() {
      return null; // Products don't seem to have a ranking, but it's displayed on screen...
    }
  };

  return Product;

}());
