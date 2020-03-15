'use strict';

var UrlHelperService = function() {
  /**
   * @param {ProductSuggestion} productSuggestion
   * @return {string}
   */
  this.getPathForSuggestedProduct = function (productSuggestion) {
    // Of course, by "path", we mean the bit after the hash.
    return '/viewSuggestedProduct/'+productSuggestion.getRowid();
  };
};
