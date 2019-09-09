'use strict';

angular.module('endslaverynowApp')
  .controller('AuditLogReportCtrl', [
    '$scope',
    '$location',
    'dataRepositoryFactory',
    function($scope, $location, dataRepositoryFactory) {
      $scope.auditLogFilterer = new AuditLogFilterer();
      $scope.resultColumnHelper = new ResultColumnHelper();
      $scope.$location = $location;

      $scope.showFilters = true;
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

          // Apply any filters passed in on the URL.
          $scope.defaultFilters();
        }
      );

      $scope.defaultFilters = function defaultFilters() {
        // Look at the URL, and if any filters passed in look sensible, and the audit logs are compatible
        // with that filter, apply the filter to the criteria on screen.
        var urlFilters = $scope.$location.search();
        if (urlFilters.hasOwnProperty('recordType') && urlFilters.hasOwnProperty('recordId')) {
          var inHistory = false;
          if ($scope.filters.records.hasOwnProperty(urlFilters.recordType)) {
            var recordId = parseInt(urlFilters.recordId); // Values in the filters are ints
            if ($scope.filters.records[urlFilters.recordType].ids.indexOf(recordId) !== -1) {
              $scope.criteria.record.type = urlFilters.recordType;
              $scope.criteria.record.id = recordId.toString(); // The value in the screen filters are strings.
              inHistory = true;
              $scope.refreshResults(); // Re-assess search criteria and update results.
            }
          }
          if (!inHistory) {
            // The audit logs were introduced since the last change to that record (or something has gone wrong!).
            window.alert('Sorry, there is no history for that record');
          }
        }
      };

      $scope.toggleShowFilter = function toggleShowFilter() {
        $scope.showFilters = !$scope.showFilters;
      };

      $scope.buildFilterLimitDate = function buildFilterLimitDate(dateValue, isFromDate) {
        // Create a moment object from the date value. Then, if the result is for the "from" date, go
        // back to the previous midnight, otherwise go forward to just before the next midnight.
        // We do this because the datetime-picker uses the time part of the "max date" as the default time
        // when the user chooses a date. For the "from" date, we want this to be midnight on the morning of
        // the date; for the "to" date, we need it to be the midnight (well, a millisecond before) of the
        // date.
        var result = new moment(dateValue);
        if (isFromDate) {
          result.set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0});
        } else {
          result.set({'hour': 23, 'minute': 59, 'second': 59, 'millisecond': 999});
        }

        return result;
      };

      $scope.getEarliestFilterDate = function getEarliestFilterDate(isFromDate) {
        // "false" just means, "there is no earliest date" and is used if this is called before we've started
        // parsing all the audit log records.
        return $scope.filters ? this.buildFilterLimitDate($scope.filters.dates.min, isFromDate) : false;
      };

      $scope.getLatestFilterDate = function getLatestFilterDate(isFromDate) {
        // "false" just means, "there is no latest date" and is used if this is called before we've started
        // parsing all the audit log records.
        return $scope.filters ? this.buildFilterLimitDate($scope.filters.dates.max, isFromDate) : false;
      };

      $scope.clearRecordSubFilters = function clearRecordSubFilters() {
        $scope.criteria.record.id = null;
        $scope.criteria.record.column = null;
      };

      $scope.refreshResults = function refreshResults(requireApply) {
        // @TODO: Currently, every time the "value" field changes (eg after every keypress"), this method is
        // @TODO: called. If/when we have a lot of records in the future, this might end up being very slow.
        // @TODO: I would suggest implementing a debounce (explained here: https://john-dugan.com/javascript-debounce/)
        // @TODO: so that the first change (keypress) will wait for (eg) 1 second before invoking this method, and
        // @TODO: any change events during that second will basically be ignored. Add a parameter to this method
        // @TODO: to say whether to use debounce or not - most fields don't need it.

        // Angular doesn't know when the from/to dates are changed, so we have to call refresh programmatically,
        // which means we have to wrap it in an apply (otherwise the screen doesn't update).
        if (requireApply === true) {
          $scope.$apply(refreshResults(false));
        }

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
          return; // No filters. Don't attempt to filter. The screen will show a suitable message.
        }
        $scope.results = $scope.auditLogFilterer.applyFilter($scope.auditLogs, $scope.criteria);
        if ($scope.results.length === 0) {
          return; // Filtering returned zero results. No point determining result columns. Screen will show appropriate message.
        }

        // Build up the list of columns we're going to need - they can vary a lot between invocations.
        // If the user has filtered on 1 specific value for certain columns, there's no point showing that column
        // as all the values in it will be the same (as each other and the criteria).
        $scope.resultColumns.push($scope.resultColumnHelper.makeDatetime());
        if ($scope.criteria.user === null || $scope.criteria.user === 'any-admin') {
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