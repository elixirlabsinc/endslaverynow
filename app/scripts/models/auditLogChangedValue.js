'use strict';

var AuditLogChangedValue = (function () {

  var AuditLogChangedValue = function AuditLogChangedValue(recordProperty, currentValue, previousValue) {
    this.recordProperty = recordProperty;
    this.currentValue = currentValue;
    this.previousValue = previousValue;
  };

  AuditLogChangedValue.prototype = {
  };

  return AuditLogChangedValue;

}());
