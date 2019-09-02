'use strict';

angular.module('endslaverynowApp')
  .controller('AuditLogReportCtrl', [
    '$scope',
    'dataRepositoryFactory',
    function($scope, dataRepositoryFactory) {
      $scope.filters = {
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

      // This controller is different to the others in that we don't parse the audit log data unless the user
      // navigates to this page (there will be quite a lot of it, and none of it is read by the rest of the
      // system).
      $scope.auditLogs = null;
      dataRepositoryFactory.ready(
        function () {
          $scope.dataRepository = dataRepositoryFactory.getDataRepository();

          $scope.auditLogs = $scope.dataRepository.getAuditLogs();

          $scope.generateFilters($scope.auditLogs);
        }
      );

      /**
       * Go through all the records, and identify all the things we can filter on - operation types, table names,
       * users, min/max date/times, etc, etc.
       * @param {AuditLog[]} auditLogs
       */
      $scope.generateFilters = function generateFilters(auditLogs) {
        var auditLogHelper = new AuditLogHelper();
        var userTypes = auditLogHelper.getAllowedUserTypes();
        auditLogs.forEach(
          /**
           * @param {AuditLog} auditLog
           * @TODO: We should use getters for all this, plus things like "isAdminUser()"
           * @TODO: Try to make some of the expressions shorter!
           */
          function extractFilter(auditLog) {
            // Admin users and/or anonymous user.
            if (auditLog.userType === userTypes.admin) {
              if ($scope.filters.users.admins.indexOf(auditLog.userRef) === -1) {
                $scope.filters.users.admins.push(auditLog.userRef);
              }
            } else {
              $scope.filters.users.anon = true;
            }
            // Operation types.
            if ($scope.filters.operationTypes.indexOf(auditLog.operationType) === -1) {
              $scope.filters.operationTypes.push(auditLog.operationType);
            }
            // Min/max allowed date/times.
            if ($scope.filters.dates.min === null || $scope.filters.dates.min > auditLog.dateTime) {
              $scope.filters.dates.min = auditLog.dateTime;
            }
            if ($scope.filters.dates.max === null || $scope.filters.dates.max < auditLog.dateTime) {
              $scope.filters.dates.max = auditLog.dateTime;
            }
            // Records, with columns and ids.
            // The columns are in the child "changed value" records and there can be more than 1 for a given audit entry.
            if (!$scope.filters.records.hasOwnProperty(auditLog.recordType)) {
              $scope.filters.records[auditLog.recordType] = {
                columns: [],
                ids: []
              };
            }
            auditLog.changedValues.forEach(
              /**
               * @param {AuditLogChangedValue} changedValue
               */
              function filterChangedValues(changedValue) {
                if ($scope.filters.records[auditLog.recordType].columns.indexOf(changedValue.recordProperty) === -1) {
                  $scope.filters.records[auditLog.recordType].columns.push(changedValue.recordProperty);
                }
              }
            );
            if ($scope.filters.records[auditLog.recordType].ids.indexOf(auditLog.recordId) === -1) {
              $scope.filters.records[auditLog.recordType].ids.push(auditLog.recordId);
            }
          }
        );
        // @TODO: Go through the record ids and sort them into ascending order. Ditto columns.
      };
    }
  ])
;