'use strict';

var ResultColumnHelper = function() {
  this.makeDatetime = function makeDatetime() {
    return new ResultColumn('datetime', 'Date/Time');
  };

  this.makeUser = function makeUser() {
    return new ResultColumn('user', 'User');
  };

  this.makeOperation = function makeOperation() {
    return new ResultColumn('operation', 'Operation');
  };

  this.makeRecordType = function makeRecordType() {
    return new ResultColumn('recordType', 'Record Type');
  };

  this.makeRecordId = function makeRecordId() {
    return new ResultColumn('recordId', 'Record Id');
  };

  this.makeColumn = function makeColumn(tableName, columnName) {
    return new ResultColumn('column', tableName+':<br/>'+columnName, tableName, columnName);
  };
};
