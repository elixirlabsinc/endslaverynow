'use strict';

angular.module('endslaverynowApp')
  .controller('AuditLogReportCtrl', [
    '$scope',
    'dataRepositoryFactory',
    function($scope, dataRepositoryFactory) {
      $scope.auditLogFilterer = new AuditLogFilterer();

      $scope.auditLogs = null;
      $scope.criteria = {
        user: null,
        operationType: null,
        dates: {
          from: null,
          to: null
        },
        record: {
          type: null,
          id: null,
          column: null
        },
        field: {
          value: null,
          transition: 'either'
        }
      };

      // This controller is different to the others in that we don't parse the audit log data unless the user
      // navigates to this page (there will be quite a lot of it, and none of it is read by the rest of the
      // system).
      dataRepositoryFactory.ready(
        function () {
          $scope.dataRepository = dataRepositoryFactory.getDataRepository();

          $scope.auditLogs = $scope.dataRepository.getAuditLogs();
          $scope.filters = $scope.auditLogFilterer.generateFilters($scope.auditLogs);
        }
      );

      $scope.getEarliestFilterDate = function getEarliestFilterDate() {
        return $scope.filters.dates.min.toISOString();
      };

      $scope.getLatestFilterDate = function getLatestFilterDate() {
        return $scope.filters.dates.max.toISOString();
      };
    }
  ])
;