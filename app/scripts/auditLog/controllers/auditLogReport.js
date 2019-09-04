'use strict';

angular.module('endslaverynowApp')
  .controller('AuditLogReportCtrl', [
    '$scope',
    'dataRepositoryFactory',
    function($scope, dataRepositoryFactory) {
      $scope.auditLogFilterer = new AuditLogFilterer();
      $scope.resultColumnHelper = new ResultColumnHelper();

      $scope.resultColumns = [];
      $scope.results = [];
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
      $scope.noFilter = true;

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
        return (new moment($scope.filters.dates.min)).format('DD-MMM-YYYY HH:mm');
      };

      $scope.getLatestFilterDate = function getLatestFilterDate() {
        return (new moment($scope.filters.dates.max)).format('DD-MMM-YYYY HH:mm');
      };

      $scope.clearRecordSubFilters = function clearRecordSubFilters() {
        $scope.criteria.record.id = null;
        $scope.criteria.record.column = null;
      };

      $scope.refreshResults = function refreshResults() {
        // Note we have to call $apply() when we're finished because Angular doesn't know when the from/to
        // dates are changed. We detect the change via the datetime picker's events, and manually call refresh.
        $scope.sanitiseCriteria($scope.criteria);
        $scope.noFilter = !$scope.anyCriteria();
        $scope.results = [];
        $scope.resultColumns = [];
        if ($scope.criteria.dates.from !== null && !($scope.criteria.dates.from instanceof moment)) {
          $scope.criteria.dates.from = new moment($scope.criteria.dates.from, 'DD-MMM-YYYY HH:mm:ss');
        }
        if ($scope.criteria.dates.to !== null && !($scope.criteria.dates.to instanceof moment)) {
          $scope.criteria.dates.to = new moment($scope.criteria.dates.to, 'DD-MMM-YYYY HH:mm:ss');
        }
        if ($scope.criteria.dates.from !== null && $scope.criteria.dates.to !== null) {
          if ($scope.criteria.dates.from.isAfter($scope.criteria.dates.to)) {
            $scope.noFilter = true;
          }
        }
        if ($scope.noFilter) {
          $scope.$apply();
          return; // No filters. Don't attempt to filter. The screen will show a suitable message.
        }
        // @TODO: This needs to use a "debounce", ideally. Or at least the option of using one.
        $scope.results = $scope.auditLogFilterer.applyFilter($scope.auditLogs, $scope.criteria);
        if ($scope.results.length === 0) {
          $scope.$apply();
          return; // Filtering returned zero results. No point determining result columns. Screen will show appropriate message.
        }

        // Build up the list of columns we're going to need - they can vary a lot between invocations.
        // If the user has filtered on 1 specific value for certain columns, there's no point showing that column
        // as all the values in it will be the same (as each other and the criteria).
        $scope.resultColumns.push($scope.resultColumnHelper.makeDatetime());
        if ($scope.criteria.user === null) {
          $scope.resultColumns.push($scope.resultColumnHelper.makeUser());
        }
        if ($scope.criteria.operationType === null) {
          $scope.resultColumns.push($scope.resultColumnHelper.makeOperation());
        }
        if ($scope.criteria.record.type === null) {
          $scope.resultColumns.push($scope.resultColumnHelper.makeRecordType());
        }
        if ($scope.criteria.record.id === null) {
          $scope.resultColumns.push($scope.resultColumnHelper.makeRecordId());
        }
        $scope.auditLogFilterer.addChangedColumns($scope.results, $scope.resultColumns);
        $scope.$apply();
      };

      /**
       * This just converts any empty strings in the given object to nulls.
       * @param dirtyObject
       */
      $scope.sanitiseCriteria = function sanitiseCriteria(dirtyObject) {
        for (var dirtyProperty in dirtyObject) {
          if (dirtyObject.hasOwnProperty(dirtyProperty)) {
            if (dirtyObject[dirtyProperty] === '') {
              dirtyObject[dirtyProperty] = null;
            } else {
              if (dirtyObject[dirtyProperty] !== null && typeof dirtyObject[dirtyProperty] === 'object') {
                $scope.sanitiseCriteria(dirtyObject[dirtyProperty]);
              }
            }
          }
        }
      };

      /**
       * Method to return true if all the values in the search criteria object say there is no filter.
       * @return {boolean}
       */
      $scope.anyCriteria = function anyCriteria() {
        return $scope.criteria.user !== null ||
          $scope.criteria.operationType !== null ||
          $scope.criteria.dates.from !== null ||
          $scope.criteria.dates.to !== null ||
          $scope.criteria.record.type !== null ||
          $scope.criteria.record.id !== null ||
          $scope.criteria.record.column !== null ||
          $scope.criteria.field.value !== null ||
          $scope.criteria.field.transition !== 'either';
      };
    }
  ])
;