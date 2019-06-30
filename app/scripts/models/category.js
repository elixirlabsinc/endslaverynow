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

    hasId: function hasId() {
      return this.id !== null;
    },

    setId: function setId(newId) {
      this.id = newId;
    },

    hasName: function hasName() {
      return this.name !== null;
    },

    getName: function getName() {
      return this.name;
    },

    setName: function setName(name) {
      this.name = name;
    },

    getDescription: function getDescription() {
      return this.description;
    },

    setDescription: function setDescription(description) {
      this.description = description;
    },

    hasImage: function hasImage() {
      return this.image !== null;
    },

    getImage: function getImage() {
      return this.image;
    },

    setImage: function setImage(imageName) {
      this.image = imageName;
    },

    isImageAnUpload: function isImageAnUpload() {
      // @TODO: This needs do more checks, really.
      return Array.isArray(this.image) && this.image.length === 1;
    },

    getImageUploadFolder: function getImageUploadFolder() {
      return 'Category';
    },

    getParentCategoryId: function getParentCategoryId() {
      return this.parentCategoryId;
    },

    setParentCategoryId: function setParentCategoryId(parentCategoryId) {
      this.parentCategoryId = parentCategoryId;
    },

    hasParentCategory: function hasParentCategory() {
      return this.getParentCategoryId() > 0;
    }
  };

  return Category;

}());
