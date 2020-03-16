'use strict';

/**
 * This is a wrapper around the email service. There are various methods that receive a product suggestion
 * model and build an email appropriate for the method. They then call the actual mail service sender.
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
    if (productSuggestion.getSuggesterEmailAddress()) {
      var name = productSuggestion.getSuggesterGivenName()+' '+productSuggestion.getSuggesterFamilyName();
      name = name.trim();
      if (name) {
        name = ' ('+name+')';
      }

      return productSuggestion.getSuggesterEmailAddress()+name;
    } else {
      return null; // The email sender service will pick this up and simply not send the email.
    }
  };

  /**
   * @param {ProductSuggestion} productSuggestion
   */
  this.afterCreation = function (productSuggestion) {
    this.mailerService.send(
      this.buildToAddress(productSuggestion),
      'Thank you for suggesting a product',
      productSuggestion.getSuggesterGivenName(),
      'You have suggested a product for Source Right. Please click the link above and check the details are correct.',
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
      'Please see your updated product suggestion (link above).',
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
      'The new notes are: <pre>'+productSuggestion.getAdminNotes()+'</pre>',
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
      'We are sorry but we have rejected your product suggestion.',
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
      'We are pleased to tell you that we have reversed the rejection of your product suggestion.',
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
      'We are pleased to tell you that we have approved your product suggestion.',
      this.buildLink(productSuggestion)
    );
  };
};
