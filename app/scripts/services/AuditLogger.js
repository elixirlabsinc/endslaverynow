'use strict';

var AuditLogger = function () {

  /**
   * @param {string} operationType
   * @param {string} recordType
   * @param {int} recordId
   * @param {object} previousState
   * @param {object} currentState
   */
  this.log = function log(operationType, recordType, recordId, previousState, currentState) {
console.log('Creating an audit log...');
console.log('Previous state:', previousState);
console.log('Current state:', currentState);
    var changedValues = [];
    // @TODO: I think we should do things differently depending on the operation type. Eg for an insert, go through
    // @TODO: the properties of the new record and assume just the previous value was "null".
    var previousValue = null;
    var currentValue = null;
    // Go through the current state of the record and see if any of its values are different to the equivalent ones
    // in the previous state.
    for (var recordProperty in currentState) {
      if (currentState.hasOwnProperty(recordProperty)) {
        previousValue = previousState.hasOwnProperty(recordProperty) ? previousState[recordProperty] : null;
        currentValue = currentState[recordProperty];
        if (currentValue !== previousValue) {
          // @TODO: We need to also pass in the field datatype (image, etc).
          changedValues.push(new AuditLogChangedValue(recordProperty, currentValue, previousValue));
        }
      }
    }
    // Go through any properties in "previousState" that don't exist in "currentState" and treat them has having
    // gone to null.
    for (recordProperty in previousState) {
      if (previousState.hasOwnProperty(recordProperty) && !currentState.hasOwnProperty(recordProperty)) {
        previousValue = previousState[recordProperty];
        currentValue = null;
        if (currentValue !== previousValue) {
          // @TODO: We need to also pass in the field datatype (image, etc).
          changedValues.push(new AuditLogChangedValue(recordProperty, currentValue, previousValue));
        }
      }
    }

    // If the delta is empty, don't log this record.
    if (changedValues.length === 0) {
      return;
    }

    var loggedInUser = firebase.auth().currentUser;
    var logData = {
      userType: loggedInUser ? 'admin': 'anonymous',
      userRef: loggedInUser ? loggedInUser.email: null,
      operationType: operationType,
      recordType: recordType,
      recordId: recordId,
      changedValues: changedValues
    };
    var auditLog = new AuditLog(logData);
console.log('auditLog record:', auditLog);
console.log('Just the changed values:', auditLog.changedValues);

    // @TODO: Actually send the log data to the store.
  };
};
