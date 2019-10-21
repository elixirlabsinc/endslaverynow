'use strict';

/**
 * This is a table column in the result set, not a column in a record.
 */
var ResultColumn = (function () {

  var ResultColumn = function ResultColumn(columnType, columnHeading, recordType, propertyName) {
    this.columnType = columnType;
    this.columnHeading = columnHeading;
    this.recordType = recordType;
    this.propertyName = propertyName;

    // This says which columns span 2 rows (new & old values).
    this.columnsSpanningTwoRows = [
      'visitRecord',
      'datetime',
      'user',
      'operation',
      'recordType',
      'recordId'
    ];

    this.buildExternalRecordLinkAnchor = function buildExternalRecordLinkAnchor(recordType, id, model) {
      var editPath = 'unknown';
      switch (recordType) {
        case 'brands':
          editPath = 'editBrand';
          break;
        case 'categories':
          editPath = 'editCategory';
          break;
        case 'products':
          editPath = 'editProduct';
          break;
      }
      var result = '';
      if (model !== null) {
        result = '<a href="/#!/admin/' + editPath + '/' + id + '" target="_blank">Go</a>';
      }

      return result;
    };

    this.buildExternalRecordLinkCell = function buildExternalRecordLinkCell(recordType, id, model) {
      var prompt = 'Unknown';
      switch (recordType) {
        case 'brands':
          prompt = 'Brand';
          break;
        case 'categories':
          prompt = 'Category';
          break;
        case 'products':
          prompt = 'Product';
          break;
      }
      var tooltip = prompt + ': ' + (model === null ? '[deleted]' : model.getName());
      var link = this.buildExternalRecordLinkAnchor(recordType, id, model);
      var result = '<span title="' + tooltip + '">' +
        id +
        (link === '' ? '' : ' ' + link) +
        '</span>';

      return result;
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

    getClass: function getClass() {
      // Yes, this is hard-coded at the moment. If we have more classes in the future, the class(es) will need
      // to be a property of this object.
      return this.columnType === 'datetime' ? 'no-wrap' : null;
    },

    isCellDisplayed: function isCellDisplayed(isForNew) {
      return (isForNew || !this.spansTwoRows());
    },

    /**
     * @param {AuditLog} auditLog
     * @param isForNew
     * @param {DataRepository} dataRepository This is really horrible, of course, but we need access to the current data sets.
     * @returns {string|null}
     */
    getDisplayValue: function getDisplayValue(auditLog, isForNew, dataRepository) {
      if (this.spansTwoRows()) {
        // We only show one entry per result, and it comes from the audit log header.
        switch (this.columnType) {
          case 'visitRecord':
            var recordType = auditLog.recordType;
            var id = auditLog.recordId;
            var model = null;
            switch (recordType) {
              case 'brands':
                model = dataRepository.getBrandById(id);
                break;
              case 'categories':
                model = dataRepository.getCategoryById(id);
                break;
              case 'products':
                model = dataRepository.getProductById(id);
                break;
            }
            return this.buildExternalRecordLinkAnchor(recordType, id, model);
          case 'datetime':
            // @TODO: Need to make sure users understand what timezone the date/time represents.
            var changeDate = new moment(auditLog.dateTime);
            // Output the date in the form "31 Dec 2019" and the time in 24hr format with seconds.
            return changeDate.format('DD-MMM-YYYY') + '<br/>' + changeDate.format('HH:mm:ss');
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
      // Do any special things here, eg for images, etc. Note that we assume the data type from the property
      // name, which we should improve (but it would be a lot of work).
      if (result !== null) {
        switch (matchingChangedValues[0].recordProperty) {
          case 'image':
            // Just show the image. The user can "mouseover" and/or open in a new tab if they need the URL.
            result = '<img src="' + result + '"/>';
            break;
          case 'purchaseUrl':
            // Show the URL, but make it a link (that opens in a new tab)
            result = '<a href="' + result + '" target="_blank">' + result + '</a>';
            break;
          case 'categoryId':
          case 'parentCategoryId':
            if (result > 0) {
              var category = dataRepository.getCategoryById(result);
              result = this.buildExternalRecordLinkCell('categories', result, category);
            }
            break;
          case 'brandId':
            if (result > 0) {
              var brand = dataRepository.getBrandById(result);
              result = this.buildExternalRecordLinkCell('brands', result, brand);
            }
            break;
          default:
            break;
        }
      }
      result = (result === null ? '[NULL]' : result);

      return result;
    }
  };

  return ResultColumn;
}());
