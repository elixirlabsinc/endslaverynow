'use strict';

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:CertificationsCtrl
 * @description
 * # CertificationsCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp')
	.controller('CertificationsCtrl', [
		'$scope',
		'dataRepositoryFactory',
		function($scope, dataRepositoryFactory) {
			dataRepositoryFactory.ready(
				$scope,
				function() {
					// Get certification information
					$scope.certifications = dataRepositoryFactory.getDataRepository().getCertifications();

					$scope.loaded = true;
				});
		}]);
