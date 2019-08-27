'use strict';

var AuditLogChangedValue = (function () {

  var AuditLogChangedValue = function AuditLogChangedValue(recordProperty, previousValue, currentValue) {
    this.recordProperty = recordProperty;
    this.previousValue = previousValue;
    this.currentValue = currentValue;
  };

  AuditLogChangedValue.prototype = {
  };

  return AuditLogChangedValue;

}());
