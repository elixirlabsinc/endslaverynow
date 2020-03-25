'use strict';

var StatusMapperService = function () {
  this.codeToDisplay = function codeToDisplay(statusCode) {
    // This is a bit quick & dirty...
    // If the code is "review", the display value is "In review". Otherwise it's the code with the first
    // character converted to upper case.
    return statusCode === 'review' ? 'In review' : statusCode[0].toUpperCase() + statusCode.substring(1);
  };
};
