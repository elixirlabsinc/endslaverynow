'use strict';

var AuditLogChangedValue = (function () {

  var AuditLogChangedValue = function AuditLogChangedValue(recordProperty, previousValue, currentValue) {
    this.recordProperty = recordProperty;
    this.previousValue = previousValue;
    this.currentValue = currentValue;
  };

  AuditLogChangedValue.prototype = {
    /**
     * Return essentially a JSON representation of this object.
     * Note: Not all the property names in the result match the property names in the class.
     *
     * @returns {{property: *, previous: *, current: *}}
     */
    toStorageRecord: function toStorageRecord() {
      return {
        property: this.recordProperty,
        previous: this.previousValue,
        current: this.currentValue
      };
    }
  };

  return AuditLogChangedValue;

}());
