'use strict';

var ResultColumn = (function () {

  var ResultColumn = function ResultColumn(columnType, columnHeading, recordType, propertyName) {
    this.columnType = columnType;
    this.columnHeading = columnHeading;
    this.recordType = recordType;
    this.propertyName = propertyName;

    // This says which columns span 2 rows (new & old values).
    this.columnsSpanningTwoRows = [
      'datetime',
      'user',
      'operation',
      'recordType',
      'recordId'
    ];
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.padDateTime = function padDateTime(value) {
      return (value < 10 ? '0' : '')+value.toString(); // The result must always be a string.
    };
  };

  ResultColumn.prototype = {
    getHeading: function getHeading() {
      return this.columnHeading;
    },

    spansTwoRows: function spansTwoRows() {
      return this.columnsSpanningTwoRows.indexOf(this.columnType) !== -1;
    },

    getRowSpan: function getRowSpan(isForNew) {
      return (isForNew && this.spansTwoRows()) ? 2 : 1;
    },

    isCellDisplayed: function isCellDisplayed(isForNew) {
      return (isForNew || !this.spansTwoRows());
    },

    /**
     * @param {AuditLog} auditLog
     * @returns {string|null}
     */
    getDisplayValue: function getDisplayValue(auditLog, isForNew) {
      if (this.spansTwoRows()) {
        // We only show one entry per result, and it comes from the audit log header.
        switch (this.columnType) {
          case 'datetime':
            // @TODO: Using moment would make this much easier.
            var day = this.padDateTime(auditLog.dateTime.getDate());
            var month = this.monthNames[auditLog.dateTime.getMonth()];
            var year = this.padDateTime(auditLog.dateTime.getFullYear());
            return day + '-' + month + '-' + year + '<br/>' +
              this.padDateTime(auditLog.dateTime.getHours()) + ':' + this.padDateTime(auditLog.dateTime.getMinutes()) + ':' + this.padDateTime(auditLog.dateTime.getSeconds());
          case 'user':
            return auditLog.userType === 'anonymous' ? '(anonymous)' : auditLog.userRef;
          case 'operation':
            return auditLog.operationType; // @TODO: Might be nice to show this with an upper case initial letter.
          case 'recordType':
            return auditLog.recordType;
          case 'recordId':
            return auditLog.recordId;
          default:
            return '[Unknown column type]'; // Obviously, it should never get here.
        }
      }
      // We need to output either the "before" or the "after" value.
      // The record type might not match (this will happen!), in which case we need to return nothing.
      // We need to find the right element in the list of changed values for this log entry. It's possible that
      // it's not there, in which case we return nothing.
      if (this.recordType !== auditLog.recordType) {
        return null; // Wrong record type.
      }
      var self = this;
      var matchingChangedValues = auditLog.changedValues.filter(
        /**
         * @param {AuditLogChangedValue} changedValue
         */
        function findColumn(changedValue) {
          return changedValue.recordProperty === self.propertyName;
        }
      );
      if (matchingChangedValues.length !== 1) {
        return null;
      }

      var result = isForNew ? matchingChangedValues[0].currentValue : matchingChangedValues[0].previousValue;
      // Do special things here, eg for images, etc. Note that we assume the data type from the property name,
      // which we should improve (but it would be a lot of work).
      // @TODO: We could also show the old value in grey (using a class, of course).
      if (matchingChangedValues[0].recordProperty === 'image') {
        if (result !== null) {
          result = '<img src="' + result + '"/>';
        }
      }
      result = (result === null ? '[NULL]' : result);

      return result;
    }
  };

  return ResultColumn;
}());
