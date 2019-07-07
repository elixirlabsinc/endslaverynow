'use strict';

var Brand = (function () {

  var Brand = function Brand(data) {
    this.categoryIdsCsl = data.hasOwnProperty('categories') ? data.categories : null;
    this.description = data.hasOwnProperty('description') ? data.description : null;
    this.id = data.hasOwnProperty('id') ? parseInt(data.id) : null;
    this.image = data.hasOwnProperty('image') ? data.image : null;
    this.name = data.hasOwnProperty('name') ? data.name : null;
    this.ranking = data.hasOwnProperty('ranking') ? data.ranking : null;
    this.brandUrl = null; // @TODO: There does not seem to be a URL property in the data.

    // Convert the category ids CSL to an array and remember it.
    this.categoryIds = this.categoryIdsCsl === null ? [] : String(this.categoryIdsCsl).split(',');
  };

  Brand.prototype = {
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

    hasName: function hasName() {
      return this.name !== null;
    },

    setName: function setName(name) {
      this.name = name;
    },

    getImage: function getImage() {
      return this.image;
    },

    hasImage: function hasImage() {
      return this.image !== null;
    },

    setImage: function setImage(imageData) {
      this.image = imageData;
    },

    imageRequiresUploading: function imageRequiresUploading() {
      // @TODO: This needs do more checks, really.
      return Array.isArray(this.image) && this.image.length === 1;
    },

    getCategoryIdAsArray: function getCategoryIdAsArray() {
      return this.categoryIds;
    },

    getCategoryIdAsCsl: function getCategoryIdAsCsl() {
      return this.categoryIds.join(',');
    },

    getFirstCategoryId: function getFirstCategoryId() {
      // We create the array in this class, so we know it uses a zero-based index.
      return this.categoryIds.length ? this.categoryIds[0] : null;
    },

    setCategoryIds: function setCategoryIds(categoryIds) {
      // @TODO: we should check that categoryIds is an array (or null).
      this.categoryIds = categoryIds;
    },

    getRanking: function getRanking() {
      return this.ranking;
    },

    hasRanking: function hasRanking() {
      return this.ranking !== null;
    },

    setRanking: function setRanking(ranking) {
      this.ranking = ranking;
    },

    getDescription: function getDescription() {
      return this.description;
    },

    hasDescription: function hasDescription() {
      return this.description !== null;
    },

    setDescription: function setDescription(description) {
      this.description = description;
    },

    getBrandURL: function getBrandURL() {
      return this.brandUrl;
    },

    hasBrandURL: function hasBrandURL() {
      return this.brandUrl !== null;
    }
  };

  return Brand;

}());
