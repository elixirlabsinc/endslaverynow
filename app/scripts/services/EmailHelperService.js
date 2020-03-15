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
  this.buildUrl = function (productSuggestion) {
    return this.$location.protocol()+'://'+this.$location.host()+':'+this.$location.port()+'/'+this.$location.hash()+'#!'+
      this.urlHelperService.getPathForSuggestedProduct(productSuggestion);
  };

  /**
   * @param {ProductSuggestion} productSuggestion
   */
  this.afterCreation = function (productSuggestion) {
    this.mailerService.send(
      productSuggestion.getSuggesterEmailAddress(),
      'Thank you for suggesting a product',
      'Product details will appear here. The URL is: '+this.buildUrl(productSuggestion)
    );
  };

  /**
   * @param {ProductSuggestion} productSuggestion
   */
  this.afterCodeValidation = function (productSuggestion) {
    this.mailerService.send(
      productSuggestion.getSuggesterEmailAddress(),
      'Thank you for validating your code',
      'The URL is: '+this.buildUrl(productSuggestion)
    );
  };

  /**
   * @param {ProductSuggestion} productSuggestion
   */
  this.afterEdit = function (productSuggestion) {
    this.mailerService.send(
      productSuggestion.getSuggesterEmailAddress(),
      'Your product suggestion has been edited',
      'Please see your updated product suggestion ('+this.buildUrl(productSuggestion)+').'
    );
  };

  /**
   * @param {ProductSuggestion} productSuggestion
   */
  this.afterAddNotes = function (productSuggestion) {
    this.mailerService.send(
      productSuggestion.getSuggesterEmailAddress(),
      'We have added/amended the notes on your product suggestion',
      'We have added/amended the notes on your product suggestion ('+this.buildUrl(productSuggestion)+').'
    );
  };

  /**
   * @param {ProductSuggestion} productSuggestion
   */
  this.afterRejection = function (productSuggestion) {
    this.mailerService.send(
      productSuggestion.getSuggesterEmailAddress(),
      'Your product suggestion has been rejected',
      'We are sorry but we have rejected your product suggestion ('+this.buildUrl(productSuggestion)+').'
    );
  };

  /**
   * @param {ProductSuggestion} productSuggestion
   */
  this.afterUnrejection = function (productSuggestion) {
    this.mailerService.send(
      productSuggestion.getSuggesterEmailAddress(),
      'Your product suggestion has been un-rejected',
      'We are pleased to tell you that we have reversed the rejection your product suggestion ('+this.buildUrl(productSuggestion)+').'
    );
  };

  /**
   * @param {ProductSuggestion} productSuggestion
   */
  this.afterApproval = function (productSuggestion) {
    this.mailerService.send(
      productSuggestion.getSuggesterEmailAddress(),
      'Your product suggestion has been approved',
      'We are pleased to tell you that we have approved your product suggestion ('+this.buildUrl(productSuggestion)+').'
    );
  };
};
