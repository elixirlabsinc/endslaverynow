'use strict';

/**
 * This is a wrapper around the email service. There are various methods that receive a product suggestion
 * model and build an email appropriate for the method. They then call the actual mail service sender.
 * @TODO: In all the "after" methods here, we need to make sure the appropriate stuff is included in the body.
 *
 * @param {$location} $location
 * @param {MailerService} MailerService
 * @param {UrlHelperService} UrlHelperService
 * @constructor
 */
var EmailHelperService = function ($location, MailerService, UrlHelperService)
{
  this.$location = $location;
  this.mailerService = MailerService;
  this.urlHelperService = UrlHelperService;

  /**
   * // @TODO: We should have a service that does this. It can be called when the suggestion is first made, when we need to redirect to the view screen.
   * @param {ProductSuggestion} productSuggestion
   * @return {string}
   */
  this.buildLink = function (productSuggestion) {
    var url = this.$location.protocol()+'://'+this.$location.host()+':'+this.$location.port()+'/'+this.$location.hash()+'#!'+
      this.urlHelperService.getPathForSuggestedProduct(productSuggestion);
    var productName = productSuggestion.getName();
    productName = productName ? productName : productSuggestion.getDescription();
    productName = productName ? productName : 'Your product suggestion';

    return'<a href="'+url+'">'+productName+'</a>';
  };

  this.buildToAddress = function buildTo(productSuggestion) {
    // We want something of the form "email@address.com (Firstname Lastname)".
    // If there is no email address, return null.
    // @TODO: productSuggestion.getSuggesterEmailAddress()
    return 'pedanticantic+to-address@gmail.com (Glenn Test)';
  };

  /**
   * @param {ProductSuggestion} productSuggestion
   */
  this.afterCreation = function (productSuggestion) {
    this.mailerService.send(
      this.buildToAddress(productSuggestion),
      'Thank you for suggesting a product',
      productSuggestion.getSuggesterGivenName(),
      'Product details will appear here. The URL is: ', // @TODO: finalise this
      this.buildLink(productSuggestion)
    );
  };

  /**
   * @param {ProductSuggestion} productSuggestion
   */
  this.afterCodeValidation = function (productSuggestion) {
    this.mailerService.send(
      this.buildToAddress(productSuggestion),
      'Thank you for validating your code',
      productSuggestion.getSuggesterGivenName(),
      'The URL is: ', // @TODO: finalise this
      this.buildLink(productSuggestion)
    );
  };

  /**
   * @param {ProductSuggestion} productSuggestion
   */
  this.afterEdit = function (productSuggestion) {
    this.mailerService.send(
      this.buildToAddress(productSuggestion),
      'Your product suggestion has been edited',
      productSuggestion.getSuggesterGivenName(),
      'Please see your updated product suggestion.', // @TODO: finalise this
      this.buildLink(productSuggestion)
    );
  };

  /**
   * @param {ProductSuggestion} productSuggestion
   */
  this.afterAddNotes = function (productSuggestion) {
    this.mailerService.send(
      this.buildToAddress(productSuggestion),
      'We have added/amended the notes on your product suggestion',
      productSuggestion.getSuggesterGivenName(),
      'We have added/amended the notes on your product suggestion', // @TODO: finalise this
      this.buildLink(productSuggestion)
    );
  };

  /**
   * @param {ProductSuggestion} productSuggestion
   */
  this.afterRejection = function (productSuggestion) {
    this.mailerService.send(
      this.buildToAddress(productSuggestion),
      'Your product suggestion has been rejected',
      productSuggestion.getSuggesterGivenName(),
      'We are sorry but we have rejected your product suggestion', // @TODO: finalise this
      this.buildLink(productSuggestion)
    );
  };

  /**
   * @param {ProductSuggestion} productSuggestion
   */
  this.afterUnrejection = function (productSuggestion) {
    this.mailerService.send(
      this.buildToAddress(productSuggestion),
      'Your product suggestion has been un-rejected',
      productSuggestion.getSuggesterGivenName(),
      'We are pleased to tell you that we have reversed the rejection your product suggestion', // @TODO: finalise this
      this.buildLink(productSuggestion)
    );
  };

  /**
   * @param {ProductSuggestion} productSuggestion
   */
  this.afterApproval = function (productSuggestion) {
    this.mailerService.send(
      this.buildToAddress(productSuggestion),
      'Your product suggestion has been approved',
      productSuggestion.getSuggesterGivenName(),
      'We are pleased to tell you that we have approved your product suggestion', // @TODO: finalise this
      this.buildLink(productSuggestion)
    );
  };
};
