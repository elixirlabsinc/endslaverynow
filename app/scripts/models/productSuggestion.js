'use strict';

// This class extends the product class, and adds the various "suggester" fields. I'm sure there is a better way
// of doing it, but this is the only one I could get to work.
var ProductSuggestion = (function () {

  var ProductSuggestion = function ProductSuggestion(data) {

    angular.extend(this, new Product(data));

    // The raw row reference in the store. People who suggest a product need to be able to come back and view
    // their suggestion. We can't use our own generated id because they'll go finishing!
    this.rowid = data.hasOwnProperty('$id') ? data.$id : null;

    // BrandId and categoryId are mandatory in Product, but not in ProductSuggestion. The former assumes they
    // are present, but if they are null, the properties end up as NaN. So, if they are NaN, set them to null.
    this.brandId = Number.isNaN(this.brandId) ? null : this.brandId;
    this.categoryId = Number.isNaN(this.categoryId) ? null : this.categoryId;

    // A reference to the product that was generated from this suggestion.
    this.generatedProductId = this.extractInt(data, 'generatedProductId');

    this.suggesterGivenName = data.hasOwnProperty('suggesterGivenName') ? data.suggesterGivenName : null;
    this.suggesterFamilyName = data.hasOwnProperty('suggesterFamilyName') ? data.suggesterFamilyName : null;
    this.suggesterTelephoneNumber = data.hasOwnProperty('suggesterTelephoneNumber') ? data.suggesterTelephoneNumber : null;
    this.suggesterEmailAddress = data.hasOwnProperty('suggesterEmailAddress') ? data.suggesterEmailAddress : null;
    this.suggesterWhy = data.hasOwnProperty('suggesterWhy') ? data.suggesterWhy : null;
    this.suggesterNotes = data.hasOwnProperty('suggesterNotes') ? data.suggesterNotes : null;

    this.adminNotes = data.hasOwnProperty('adminNotes') ? data.adminNotes : null;

    // Some fields with default values.
    // @TODO: The valid status values need to be in some library code somewhere (eg for the default value here).
    // @TODO: I just couldn't work out how to do this in a model - I can inject the allowed statuses into controllers.
    // @TODO: Validate that the status ends up with a valid value.
    this.status = data.hasOwnProperty('status') ? data.status : 'pending';
    this.createdAtUtc = data.hasOwnProperty('createdAtUtc') ? new moment(data.createdAtUtc) : new moment();
  };

  ProductSuggestion.prototype = {
    getRowid: function getRowid() {
      return this.rowid;
    },

    setGeneratedProductId: function setGeneratedProductId(newGeneratedProductId) {
      this.generatedProductId = newGeneratedProductId;
    },

    getGeneratedProductId: function getGeneratedProductId() {
      return this.generatedProductId;
    },

    setSuggesterGivenName: function setSuggesterGivenName(newSuggesterGivenName) {
      this.suggesterGivenName = newSuggesterGivenName;
    },

    getSuggesterGivenName: function getSuggesterGivenName() {
      return this.suggesterGivenName;
    },

    setSuggesterFamilyName: function setSuggesterFamilyName(newSuggesterFamilyName) {
      this.suggesterFamilyName = newSuggesterFamilyName;
    },

    getSuggesterFamilyName: function getSuggesterFamilyName() {
      return this.suggesterFamilyName;
    },

    setSuggesterTelephoneNumber: function setSuggesterTelephoneNumber(newSuggesterTelephoneNumber) {
      this.suggesterTelephoneNumber = newSuggesterTelephoneNumber;
    },

    getSuggesterTelephoneNumber: function getSuggesterTelephoneNumber() {
      return this.suggesterTelephoneNumber;
    },

    setSuggesterEmailAddress: function setSuggesterEmailAddress(newSuggesterEmailAddress) {
      this.suggesterEmailAddress = newSuggesterEmailAddress;
    },

    getSuggesterEmailAddress: function getSuggesterEmailAddress() {
      return this.suggesterEmailAddress;
    },

    getSuggesterWhy: function getSuggesterWhy() {
      return this.suggesterWhy;
    },

    getSuggesterNotes: function getSuggesterNotes() {
      return this.suggesterNotes;
    },

    getStatus: function getStatus() {
      return this.status;
    },

    setStatus: function setStatus(newStatus) {
      // @TODO: We should validate the status
      this.status = newStatus;
    },

    getCreatedAtUtc: function getCreatedAtUtc() {
      // createdAtUtc is an instance of moment.
      return this.createdAtUtc;
    },

    getAdminNotes: function getAdminNotes() {
      return this.adminNotes;
    },

    setAdminNotes: function setAdminNotes(newNotes) {
      this.adminNotes = newNotes;
    },

    hasAdminNotes: function hasAdminNotes() {
      return this.adminNotes != null && this.adminNotes != '';
    }
  };
  angular.extend(ProductSuggestion.prototype, Product.prototype);

  return ProductSuggestion;

}());
