'use strict';

/**
 * This service allows us to send emails from the application. The idea is that an instance is injected into
 * the appropriate controller, and the controller just calls "send" on the object. The controllers don't
 * need to know what service we're using, etc. It means we can change the service without changing the
 * application.
 */
var MailerService = function() {
  // @TODO: In all the calls to this, we need to sort out what we're including.
  // @TODO: In fact, it might be better to have a service that has a method for each type of event, and the
  // @TODO: application just calls the right method and passed in the suggested product object. Those
  // @TODO: methods then build the to, subject and body. The Mailer service could be embedded in that service,
  // @TODO: then, and not injected into the controllers.
  // @TODO: Need to determine the URL each time - the "admin" URLs are no good!
  this.send = function send(to, subject, body, cc) {
console.log('MailerService.send is being called');
    var result = {
      success: false,
      errorMessage: 'Unknown error'
    };
    if (to === null || to === '') {
      result.errorMessage = '"To" is missing';

console.log('Result:', result);
      return result;
    }

console.log('subject, body, cc:', subject, body, cc);
    result.errorMessage = 'Code is not implemented';

console.log('Result:', result);
    return result;
  };
};
