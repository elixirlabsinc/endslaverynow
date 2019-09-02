'use strict';

var AuditLogFilterer = function() {
  /**
   * Go through all the given records, and identify all the things we can filter on - operation types, table names,
   * users, min/max date/times, etc, etc.
   * @param {AuditLog[]} auditLogs
   */
  this.generateFilters = function generateFilters(auditLogs) {
    var auditLogHelper = new AuditLogHelper();
    var userTypes = auditLogHelper.getAllowedUserTypes();
    var result = {
      users: {
        admins: [],
        anon: false
      },
      operationTypes: [],
      dates: {
        min: null,
        max: null
      },
      records: {} // Within each record type, there will be an array of record ids and an array of columns.
    };

    auditLogs.forEach(
      /**
       * @param {AuditLog} auditLog
       * @TODO: We should use getters for all this, plus things like "isAdminUser()"
       * @TODO: Try to make some of the expressions shorter!
       */
      function extractFilter(auditLog) {
        // Admin users and/or anonymous user.
        if (auditLog.userType === userTypes.admin) {
          if (result.users.admins.indexOf(auditLog.userRef) === -1) {
            result.users.admins.push(auditLog.userRef);
          }
        } else {
          result.users.anon = true;
        }
        // Operation types.
        if (result.operationTypes.indexOf(auditLog.operationType) === -1) {
          result.operationTypes.push(auditLog.operationType);
        }
        // Min/max allowed date/times.
        if (result.dates.min === null || result.dates.min > auditLog.dateTime) {
          result.dates.min = auditLog.dateTime;
        }
        if (result.dates.max === null || result.dates.max < auditLog.dateTime) {
          result.dates.max = auditLog.dateTime;
        }
        // Records, with columns and ids.
        // The columns are in the child "changed value" records and there can be more than 1 for a given audit entry.
        if (!result.records.hasOwnProperty(auditLog.recordType)) {
          result.records[auditLog.recordType] = {
            columns: [],
            ids: []
          };
        }
        auditLog.changedValues.forEach(
          /**
           * @param {AuditLogChangedValue} changedValue
           */
          function filterChangedValues(changedValue) {
            if (result.records[auditLog.recordType].columns.indexOf(changedValue.recordProperty) === -1) {
              result.records[auditLog.recordType].columns.push(changedValue.recordProperty);
            }
          }
        );
        if (result.records[auditLog.recordType].ids.indexOf(auditLog.recordId) === -1) {
          result.records[auditLog.recordType].ids.push(auditLog.recordId);
        }
      }
    );
    // @TODO: Go through the record ids and sort them into ascending order. Ditto columns.
    // @TODO: Also sort the operation types into the order "insert", "update", "delete".

    return result;
  };
};
