'use strict';

var AuditLogHelper = function() {

  this.getAllowedUserTypes = function getAllowedUserTypes() {
    return {
      admin: 'admin',
      anonymous: 'anonymous'
    };
  };

  this.getAllowedOperationTypes = function getAllowedOperationTypes() {
    return {
      insert: 'insert',
      update: 'update',
      delete: 'delete'
    };
  };

  this.isValidUserType = function isValidUserType(userType) {
    return this.contains(userType, this.getAllowedUserTypes());
  };

  this.isValidOperationType = function isValidOperationType(operationType) {
    return this.contains(operationType, this.getAllowedOperationTypes());
  };

  this.contains = function contains(needle, haystack) {
    for (var objectProperty in haystack) {
      if (haystack.hasOwnProperty(objectProperty) && haystack[objectProperty] === needle) {
        return true;
      }
    }
  };

  /**
   * Method to convert an audit log from storage into an object suitable to passing in to the constructor
   * of the AuditLog model.
   */
  this.fromStorage = function fromStorage(auditLog) {
    // Convert the changed values into an array of change objects.
    var changedValues = [];
    if (auditLog.hasOwnProperty('changedValues') && Array.isArray(auditLog.changedValues)) {
        for (var changeIndex = 0; changeIndex < auditLog.changedValues.length; changeIndex++) {
          var data = auditLog.changedValues[changeIndex];
          changedValues.push(
            new AuditLogChangedValue(
              data.hasOwnProperty('property') ? data.property : null,
              data.hasOwnProperty('previous') ? data.previous : null,
              data.hasOwnProperty('current') ? data.current : null
            )
          );
        }
    }

    return {
      loggerVersion: auditLog.hasOwnProperty('loggerVersion') ? auditLog.loggerVersion : 0,
      userType: auditLog.hasOwnProperty('userType') ? auditLog.userType : null,
      userRef: auditLog.hasOwnProperty('userRef') ? auditLog.userRef : null,
      operationType: auditLog.hasOwnProperty('operationType') ? auditLog.operationType : null,
      dateTime: auditLog.hasOwnProperty('dateTimeUtc') ? new Date(auditLog.dateTimeUtc) : null,
      recordType: auditLog.hasOwnProperty('recordType') ? auditLog.recordType : null,
      recordId: auditLog.hasOwnProperty('recordId') ? auditLog.recordId : null,
      changedValues: changedValues
    };
  };
};
