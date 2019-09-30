'use strict';

var AuditLog = (function () {

  var AuditLog = function AuditLog(data) {
    this.loggerVersion = 1;
    this.userType = data.hasOwnProperty('userType') ? data.userType : null;
    this.userRef = data.hasOwnProperty('userRef') ? data.userRef : null;
    this.operationType = data.hasOwnProperty('operationType') ? data.operationType : null;
    this.dateTime = data.hasOwnProperty('dateTime') ? data.dateTime : new Date();
    this.recordType = data.hasOwnProperty('recordType') ? data.recordType : null;
    this.recordId = data.hasOwnProperty('recordId') ? data.recordId : null;
    this.changedValues = data.hasOwnProperty('changedValues') ? data.changedValues : null;

    var auditLogHelper = new AuditLogHelper();

    // Validate the entries.
    if (!auditLogHelper.isValidUserType(this.userType)) {
      // @TODO: Throw some kind of error.
    }
    if (!auditLogHelper.isValidOperationType(this.operationType)) {
      // @TODO: Throw some kind of error.
    }
    if (this.changedValues === null) {
      // @TODO: Throw some kind of error.
    }
  };

  AuditLog.prototype = {
    /**
     * Return essentially a JSON representation of this object.
     * Note: Not all the property names in the result match the property names in the class.
     *
     * @returns {{loggerVersion: *, userType: *, userRef: *, operationType: *, dateTime, recordType: *, recordId: *, changedValues}}
     */
    toStorageRecord: function toStorageRecord() {
      return {
        loggerVersion: this.loggerVersion,
        userType: this.userType,
        userRef: this.userRef,
        operationType: this.operationType,
        dateTimeUtc: this.dateTime.toISOString(),
        recordType: this.recordType,
        recordId: this.recordId,
        changedValues: this.changedValues.map(
          function (changedValue) {
            return changedValue.toStorageRecord();
          }
        )
      };
    }
  };

  return AuditLog;
}());
