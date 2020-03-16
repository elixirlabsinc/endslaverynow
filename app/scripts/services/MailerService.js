'use strict';

/**
 * This service allows us to send emails from the application. The idea is that an instance is injected into
 * the appropriate controller, and the controller just calls "send" on the object. The controllers don't
 * need to know what service we're using, etc. It means we can change the service without changing the
 * application.
 * @TODO: This should possibly be renamed to "EmailJsMailerService"?
 *
 * @param {$http} $http
 * @param {ENV} ENV
 * @constructor
 */
var MailerService = function($http, ENV) {
  this.$http = $http;

  this.send = function send(toEmail, subject, givenName, body, suggestedProductLink) {
    var result = {
      success: false,
      errorMessage: 'Unknown error'
    };
    if (toEmail === null || toEmail === '') {
      result.errorMessage = '"To" is missing';

      return result;
    }

    var emailjsConfig = ENV.email.emailjs;
    this.$http.post(
      'https://api.emailjs.com/api/v1.0/email/send',
      {
        service_id: emailjsConfig.service_id,
        template_id: emailjsConfig.template_id,
        user_id: emailjsConfig.user_id,
        template_params: {
          subject: subject,
          to_email: toEmail,
          given_name: givenName,
          suggested_product_link: suggestedProductLink,
          message_html: body
        }
      }
    )
    // @TODO: We need to do something here, especially if the email fails.
    .then(
      function (response) {
console.log('Email seems to have been sent okay:', response);
      },
      function (error) {
console.log('Email seems to failed:', error);
      }
    );

    result.success = true;
    result.errorMessage = null;

    return result;
  };
};
