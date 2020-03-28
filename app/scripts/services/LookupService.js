'use strict';

var LookupService = function () {
  this.reset = function reset() {
    this.selectedBrandId = null;
    this.selectedBrandName = null;
    this.selectedCategoryId = null;
    this.selectedCategoryName = null;
    this.selectedParentCategoryId = null;
    this.selectedParentCategoryName = null;
  };

  this.reset();

  /**
   * @param brand {Brand}
   */
  this.setBrand = function (brand) {
    this.selectedBrandId = brand.getId();
    this.selectedBrandName = brand.getName();
  };

  this.getSelectedBrandId = function getSelectedBrandId() {
    return this.selectedBrandId;
  };

  this.getSelectedBrandIdAsString = function getSelectedBrandIdAsString() {
    // Some things are a bit fussy with types. The brand id is an int (or null), but some things
    // need it as a string (or null).
    return this.selectedBrandId ? this.selectedBrandId.toString() : null;
  };

  this.getSelectedBrandName = function getSelectedBrandName() {
    return this.selectedBrandName;
  };

  /**
   * @param category {Category}
   */
  this.setCategory = function setCategory(category) {
    this.selectedCategoryId = category.getId();
    this.selectedCategoryName = category.getName();
  };

  this.getSelectedCategoryId = function getSelectedCategoryId() {
    return this.selectedCategoryId;
  };

  this.getSelectedCategoryIdAsString = function getSelectedCategoryIdAsString() {
    // Some things are a bit fussy with types. The category id is an int (or null), but some things
    // need it as a string (or null).
    return this.selectedCategoryId ? this.selectedCategoryId.toString() : null;
  };

  this.getSelectedCategoryName = function getSelectedCategoryName() {
    return this.selectedCategoryName;
  };

  /**
   * @param category {Category|null}
   */
  this.setParentCategory = function (category) {
    this.selectedParentCategoryId = category ? category.getId() : null;
    this.selectedParentCategoryName = category ? category.getName() : null;
  };

  this.getSelectedParentCategoryId = function getSelectedParentCategoryId() {
    return this.selectedParentCategoryId;
  };

  this.getSelectedParentCategoryName = function getSelectedParentCategoryName() {
    return this.selectedParentCategoryName;
  };
};
