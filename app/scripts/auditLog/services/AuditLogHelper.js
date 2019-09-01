'use strict';

var AuditLogHelper = function() {

  this.getAllowedUserTypes = function getAllowedUserTypes() {
    return {
      admin: 'admin',
      anonymous: 'anonymous'
    };
  };

  this.getAllowedOperationTypes = function getAllowedOperationTypes() {
    return {
      insert: 'insert',
      update: 'update',
      delete: 'delete'
    };
  };

  this.isValidUserType = function isValidUserType(userType) {
    return this.contains(userType, this.getAllowedUserTypes());
  };

  this.isValidOperationType = function isValidOperationType(operationType) {
    return this.contains(operationType, this.getAllowedOperationTypes());
  };

  this.contains = function contains(needle, haystack) {
    for (var objectProperty in haystack) {
      if (haystack.hasOwnProperty(objectProperty) && haystack[objectProperty] === needle) {
        return true;
      }
    }
  };
};
