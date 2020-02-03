'use strict';

// This class extends the product class, and adds the various "suggester" fields. I'm sure there is a better way
// of doing it, but this is the only one I could get to work.
var ProductSuggestion = (function () {

  var ProductSuggestion = function ProductSuggestion(data) {

    angular.extend(this, new Product(data));

    // BrandId and categoryId are mandatory in Product, but not in ProductSuggestion. The former assumes they
    // are present, but if they are null, the properties end up as NaN. So, if they are NaN, set them to null.
    this.brandId = Number.isNaN(this.brandId) ? null : this.brandId;
    this.categoryId = Number.isNaN(this.categoryId) ? null : this.categoryId;

    // A reference to the product that was generated from this suggestion.
    this.generatedProduct = data.hasOwnProperty('generatedProduct') ? data.generatedProduct : null;

    this.suggesterGivenName = data.hasOwnProperty('suggesterGivenName') ? data.suggesterGivenName : null;
    this.suggesterFamilyName = data.hasOwnProperty('suggesterFamilyName') ? data.suggesterFamilyName : null;
    this.suggesterTelephoneNumber = data.hasOwnProperty('suggesterTelephoneNumber') ? data.suggesterTelephoneNumber : null;
    this.suggesterEmailAddress = data.hasOwnProperty('suggesterEmailAddress') ? data.suggesterEmailAddress : null;
    this.suggesterNotes = data.hasOwnProperty('suggesterNotes') ? data.suggesterNotes : null;

    // Some fields with default values.
    // @TODO: The valid status values need to be in some library code somewhere (eg for the default value here).
    // @TODO: Validate that the status ends up with a valid value.
    this.status = data.hasOwnProperty('status') ? data.status : 'pending';
    this.createdAtUtc = data.hasOwnProperty('createdAtUtc') ? new moment(data.createdAtUtc) : new moment();
  };

  ProductSuggestion.prototype = {
    getGeneratedProduct: function getGeneratedProduct() {
      return this.generatedProduct;
    },

    getSuggesterGivenName: function getSuggesterGivenName() {
      return this.suggesterGivenName;
    },

    getSuggesterFamilyName: function getSuggesterFamilyName() {
      return this.suggesterFamilyName;
    },

    getSuggesterTelephoneNumber: function getSuggesterTelephoneNumber() {
      return this.suggesterTelephoneNumber;
    },

    getSuggesterEmailAddress: function getSuggesterEmailAddress() {
      return this.suggesterEmailAddress;
    },

    getSuggesterNotes: function getSuggesterNotes() {
      return this.suggesterNotes;
    },

    getStatus: function getStatus() {
      return this.status;
    },

    getCreatedAtUtc: function getCreatedAtUtc() {
      // createdAtUtc is an instance of moment.
      return this.createdAtUtc;
    }
  };
  angular.extend(ProductSuggestion.prototype, Product.prototype);

  return ProductSuggestion;

}());
