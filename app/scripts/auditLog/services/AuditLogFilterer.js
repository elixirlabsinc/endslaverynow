'use strict';

var AuditLogFilterer = function() {
  this.auditLogHelper = new AuditLogHelper();
  this.userTypes = this.auditLogHelper.getAllowedUserTypes();

  /**
   * Go through all the given records, and identify all the things we can filter on - operation types, table names,
   * users, min/max date/times, etc, etc.
   * @param {AuditLog[]} auditLogs
   */
  this.generateFilters = function generateFilters(auditLogs) {
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

    var self = this;
    auditLogs.forEach(
      /**
       * @param {AuditLog} auditLog
       * @TODO: We should use getters for all this, plus things like "isAdminUser()"
       * @TODO: Try to make some of the expressions shorter!
       */
      function extractFilter(auditLog) {
        // Admin users and/or anonymous user.
        if (auditLog.userType === self.userTypes.admin) {
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

  /**
   * If the searchValue starts with "admin$", strip it off, otherwise return the same value.
   * @param {string} searchValue
   * @returns {string}
   */
  this.toAdminUser = function toAdminUser(searchValue) {
    return searchValue.indexOf('admin$') === 0 ? searchValue.substr(6) : searchValue;
  };

  /**
   * Apply the given search criteria to the given set of audit logs. It returns the subset (or the whole lot)
   * of audit logs that match the criteria.
   *
   * @param {AuditLog[]} auditLogs
   * @param criteria
   * @returns {Array}
   */
  this.applyFilter = function applyFilter(auditLogs, criteria) {
    var self = this;
    // This is actually pretty straightforward. "criteria" contains a load of constraints (some are null, meaning,
    // "I don't care what the value is") and we filter the audit log records, keeping the records that match.
    // The only slightly complicated part is that some of the criteria is matched with the "header" and some with
    // the changed values.
    var result = auditLogs.filter(
      /**
       * @param {AuditLog} auditLog
       * @TODO: We should use getters, and isXXX in the audit log object.
       */
      function filterLog(auditLog) {
        // Go through the criteria. If anything doesn't match, return false immediately.

        // User.
        if (criteria.user !== null) {
          // They are filtering on a user.
          if (criteria.user === 'anonymous') {
            // They say the user must be anonymous
            if (auditLog.userType !== self.userTypes.anonymous) {
              return false; // User is not anonymous.
            }
          } else {
            // They are filtering on an admin user. For various reasons, "admin$$" has been prepended to the
            // criteria value, so we need to strip it off before testing against the audit log.
            if (auditLog.userType !== self.userTypes.admin || self.toAdminUser(criteria.user) !== auditLog.userRef) {
              return false; // User is either not an admin, or is the wrong admin.
            }
          }
        }

        // Operation type.
        if (criteria.operationType !== null) {
          if (auditLog.operationType !== criteria.operationType) {
            return false; // Operation type does not match.
          }
        }

        // Dates - "from" and "to". The dates are instances of moment (or are null).
        if (criteria.dates.from !== null) {
          if (auditLog.dateTime < criteria.dates.from) {
            return false; // Change was before "from" date.
          }
        }
        if (criteria.dates.to !== null) {
          if (auditLog.dateTime > criteria.dates.to) {
            return false; // Change was before "to" date.
          }
        }

        // Record - type, id, field
        if (criteria.record.type !== null) {
          if (auditLog.recordType !== criteria.record.type) {
            return false; // Is the wrong type of record.
          }
          // Id.
          if (criteria.record.id !== null) {
            if (auditLog.recordId !== parseInt(criteria.record.id)) {
              return false; // Right type of record, but wrong id.
            }
          }
          // Field.
          if (criteria.record.column !== null) {
            // For this one, we need to look in the changed values.
            var changesToColumn = auditLog.changedValues.filter(
              /**
               * @param {AuditLogChangedValue} changedValue
               * @returns {boolean}
               */
              function findColumn(changedValue) {
                return changedValue.recordProperty === criteria.record.column;
              }
            );
            if (changesToColumn.length === 0) {
              return false; // Right type of record, but that column wasn't changed.
            }
          }
        }

        // Field value (could be for any field, or a specific column).
        if (criteria.field.value !== null) {
          // If a table was specified, and it's different to this one, then this audit log would already have been excluded (above).
          // For this one, we need to look in the changed values.
          var changesToValue = auditLog.changedValues.filter(
            /**
             * @param {AuditLogChangedValue} changedValue
             * @returns {boolean}
             */
            function checkValue(changedValue) {
              // Look to see if the value has changed "from" or "to" or "from or to" the given value.
              if (
                !(
                  (criteria.field.transition === 'from' || criteria.field.transition === 'either') && changedValue.previousValueMatches(criteria.field.value)
                ) && !(
                  (criteria.field.transition === 'to' || criteria.field.transition === 'either') && changedValue.currentValueMatches(criteria.field.value)
                )
              ) {
                return false; // Field value (previous or current as appropriate) doesn't match the value.
              }
              // If the user has specified a field, we must honour that.
              if (criteria.record.column !== null) {
                if (changedValue.recordProperty !== criteria.record.column) {
                  return false; // Wrong column.
                }
              }

              return true;
            }
          );
          if (changesToValue.length === 0) {
            return false; // field wasn't changed to/from the given value.
          }
        }

        return true;
      }
    );

    return result;
  };

  /**
   * Go through the results array, and add every column with a changed value to the result columns. We must
   * go through the whole result set first, so we can group the new columns by record type.
   * @TODO: I'm not absolutely sure if this is the most efficient way of doing this. Making the filter
   * @TODO: method above (applyFilter) build up a list of all the tables/columns it has encountered would be
   * @TODO: more efficient. However, returning the result columns would be difficult. I'm going to leave it
   * @TODO: like this for now as it works. We can deal with efficiency later.
   * @param {AuditLog[]} auditLogFilterResults
   * @param {ResultColumn[]} existingResultColumns
   */
  this.addChangedColumns = function addChangedColumns(auditLogFilterResults, existingResultColumns) {
    // Identify all the tables and columns that are present.
    var tablesAndColumns = {};
    auditLogFilterResults.forEach(
      /**
       * @param {AuditLog} auditLog
       */
      function (auditLog) {
        // Make sure the table has an entry.
        if (!tablesAndColumns.hasOwnProperty(auditLog.recordType)) {
          tablesAndColumns[auditLog.recordType] = {};
        }
        auditLog.changedValues.forEach(
          /**
           * @param {AuditLogChangedValue} changedValue
           */
          function (changedValue) {
            if (!tablesAndColumns[auditLog.recordType].hasOwnProperty(changedValue.recordProperty)) {
              tablesAndColumns[auditLog.recordType][changedValue.recordProperty] = true;
            }
          }
        );
      }
    );
    // Now loop through the tables & columns, and add an result column for each.
    var resultColumnHelper = new ResultColumnHelper();
    for (var tableName in tablesAndColumns) {
      if (tablesAndColumns.hasOwnProperty(tableName)) {
        for (var columnName in tablesAndColumns[tableName]) {
          if (tablesAndColumns[tableName].hasOwnProperty(columnName)) {
            existingResultColumns.push(resultColumnHelper.makeColumn(tableName, columnName));
          }
        }
      }
    }
  };
};
