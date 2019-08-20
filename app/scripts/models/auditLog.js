'use strict';

var AuditLog = (function () {

  const allowedUserTypes = ['admin', 'anonymous'];
  const allowedOperationTypes = ['insert', 'update', 'delete'];

  var AuditLog = function AuditLog(data) {
    this.userType = data.hasOwnProperty('userType') ? data.userType : null;
    this.userRef = data.hasOwnProperty('userRef') ? data.userRef : null;
    this.operationType = data.hasOwnProperty('operationType') ? data.operationType : null;
    this.dateTime = new Date();
    this.recordType = data.hasOwnProperty('recordType') ? data.recordType : null;
    this.recordId = data.hasOwnProperty('recordId') ? data.recordId : null;
    this.delta = data.hasOwnProperty('delta') ? data.delta : null;
    this.loggerVersion = 1;

    // Validate the entries.
    if (allowedUserTypes.indexOf(this.userType) === -1) {
      // @TODO: Throw some kind of error.
    }
    if (allowedOperationTypes.indexOf(this.operationType) === -1) {
      // @TODO: Throw some kind of error.
    }
    if (this.delta === null) {
      // @TODO: Throw some kind of error.
    }
  };

  AuditLog.prototype = {
  };

  return AuditLog;

}());
