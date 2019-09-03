'use strict';

var AuditLogChangedValue = (function () {

  /**
   * Currently, we don't pass in the field datatype (image, etc) because I think we can manage without it.
   * If we decide to do so, we would add the parameter here, and obviously update the code that instantiates
   * this object. Plus, of course, increment the version number in auditLog.
   *
   * @param {string} recordProperty
   * @param previousValue
   * @param currentValue
   * @constructor
   */
  var AuditLogChangedValue = function AuditLogChangedValue(recordProperty, previousValue, currentValue) {
    this.recordProperty = recordProperty;
    this.previousValue = previousValue;
    this.currentValue = currentValue;

    this.valueMatchesProperty = function valueMatchesProperty(propertyValue, matchValue) {
      if (typeof propertyValue === 'string') {
        return propertyValue.toLowerCase().indexOf(matchValue.toLowerCase()) !== -1;
      } else if (typeof propertyValue === 'number') {
        return propertyValue.toString() === matchValue;
      }

      return false;
    };
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
    },

    previousValueMatches: function previousValueMatches(matchValue) {
      return this.valueMatchesProperty(this.previousValue, matchValue);
    },

    currentValueMatches: function currentValueMatches(matchValue) {
      return this.valueMatchesProperty(this.currentValue, matchValue);
    }
  };

  return AuditLogChangedValue;

}());
