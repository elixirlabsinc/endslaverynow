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

  this.getSelectedCategoryIdAsString = function getSelectedCategoryIdAsString() {
    // Some things are a bit fussy with types. The category id is an int (or null), but some things
    // need it as a string (or null).
    return this.selectedCategoryId ? this.selectedCategoryId.toString() : null;
  };

  this.getSelectedCategoryName = function getSelectedCategoryName() {
    return this.selectedCategoryName;
  };
};
