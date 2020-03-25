'use strict';

var LookupService = function () {
  this.reset = function reset() {
    this.selectedCategoryId = null;
    this.selectedCategoryName = null;
  };

  this.reset();

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

  this.getSelectedCategoryName = function getSelectedCategoryName() {
    return this.selectedCategoryName;
  };
};
