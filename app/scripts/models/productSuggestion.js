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

    this.suggesterGivenName = data.hasOwnProperty('suggesterGivenName') ? data.suggesterGivenName : null;
    this.suggesterFamilyName = data.hasOwnProperty('suggesterFamilyName') ? data.suggesterFamilyName : null;
    this.suggesterTelephoneNumber = data.hasOwnProperty('suggesterTelephoneNumber') ? data.suggesterTelephoneNumber : null;
    this.suggesterEmailAddress = data.hasOwnProperty('suggesterEmailAddress') ? data.suggesterEmailAddress : null;
    this.suggesterNotes = data.hasOwnProperty('suggesterNotes') ? data.suggesterNotes : null;

    // Some fields with default values.
    // @TODO: The valid status values need to be in some library code somewhere (eg for the default value here).
    // @TODO: Validate that the status ends up with a valid value.
    this.status = data.hasOwnProperty('status') ? data.status : 'pending';
    // @TODO: Test this works when we load existing records from the store.
    this.createdAt = data.hasOwnProperty('createdAt') ? new moment(data.createdAt) : new moment();
  };

  ProductSuggestion.prototype = {

  };

  return ProductSuggestion;

}());
