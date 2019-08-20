'use strict';

var AuditLogger = function () {

  /**
   * @param {string} operationType
   * @param {string} recordType
   * @param {int} recordId
   * @param {array} previousState
   * @param {array} currentState
   */
  this.log = function log(operationType, recordType, recordId, previousState, currentState) {
console.log('Creating an audit log...');
console.log('Previous state:', previousState);
console.log('Current state:', currentState);
    // @TODO: Actually send the log data to the store.
    var delta = [];
    // @TODO: We need to go through any properties in "previousState" that don't exist in "currentState" and treat
    // @TODO: them has having gone to null.
    for (var recordProperty in currentState) {
      if (currentState.hasOwnProperty(recordProperty)) {
        var previousValue = previousState.hasOwnProperty(recordProperty) ? previousState[recordProperty] : null;
        var currentValue = currentState[recordProperty];
        // @TODO: Check what happens if one or both is null - make sure differences are picked up.
        if (currentValue !== previousValue) {
          // @TODO: We need to also pass in the field datatype (image, etc).
          delta.push(new AuditLogChangedValue(recordProperty, currentValue, previousValue));
        }
      }
    }
    // @TODO: If delta is empty, don't log this record.

    var loggedInUser = firebase.auth().currentUser;
    var logData = {
      userType: loggedInUser ? 'admin': 'anonymous',
      userRef: loggedInUser ? loggedInUser.email: null,
      operationType: operationType,
      recordType: recordType,
      recordId: recordId,
      delta: delta
    };
    var auditLog = new AuditLog(logData);
console.log('auditLog record:', auditLog);
  };
};
