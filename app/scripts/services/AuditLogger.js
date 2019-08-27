'use strict';

var AuditLogger = function (recordSets) {
  this.recordSets = recordSets;

  /**
   * @param {string} operationType
   * @param {string} recordType
   * @param {int} recordId
   * @param {object|null} previousState
   * @param {object|null} currentState
   */
  this.log = function log(operationType, recordType, recordId, previousState, currentState) {
    var changedValues = [];
    // Build the "changed values" in different ways, depending on the operation type.
    switch (operationType) {
      case 'insert':
        changedValues = this.buildChangedValuesForInsert(currentState);
        break;
      case 'update':
        changedValues = this.buildChangedValuesForUpdate(previousState, currentState);
        break;
      case 'delete':
        changedValues = this.buildChangedValuesForDelete(previousState);
        break;
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

    // Actually send the log data to the store. This is always an "add", of course.
    // We don't report any success/failure messages to the user because they shouldn't be aware of these logs.
    // @TODO: 'auditLog' should be a constant.
    this.recordSets['auditLog'].$add(auditLog.toStorageRecord()).then(
      function () {
        console.log('Audit log saved successfully');
      },
      function (error) {
        console.log('Audit log save produced an error:', error);
      }
    );
  };

  /**
   * This situation is simple - there is no "before" record, so we just record every non-null value in the
   * current state.
   *
   * @param {object} currentState
   *
   * @returns {AuditLogChangedValue[]}
   */
  this.buildChangedValuesForInsert = function buildChangedValuesForInsert(currentState)
  {
    var result = [];
    for (var recordProperty in currentState) {
      if (currentState.hasOwnProperty(recordProperty)) {
        if (currentState[recordProperty] !== null) {
          // @TODO: We need to also pass in the field datatype (image, etc).
          result.push(new AuditLogChangedValue(recordProperty, null, currentState[recordProperty]));
        }
      }
    }

    return result;
  };

  /**
   * This is the most complicated situation - there are "before" and "after" properties/values.
   *
   * @param {object} previousState
   * @param {object} currentState
   *
   * @returns {AuditLogChangedValue[]}
   */
  this.buildChangedValuesForUpdate = function buildChangedValuesForUpdate(previousState, currentState)
  {
    var result = [];
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
          result.push(new AuditLogChangedValue(recordProperty, previousValue, currentValue));
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
          result.push(new AuditLogChangedValue(recordProperty, previousValue, currentValue));
        }
      }
    }

    return result;
  };

  /**
   * This situation is simple - there is no "after" record, so we just record every non-null value in the
   * previous state.
   *
   * @param {object} previousState
   *
   * @returns {AuditLogChangedValue[]}
   */
  this.buildChangedValuesForDelete = function buildChangedValuesForDelete(previousState)
  {
    var result = [];
    for (var recordProperty in previousState) {
      if (previousState.hasOwnProperty(recordProperty)) {
        if (previousState[recordProperty] !== null) {
          // @TODO: We need to also pass in the field datatype (image, etc).
          result.push(new AuditLogChangedValue(recordProperty, previousState[recordProperty], null));
        }
      }
    }

    return result;
  };
};
