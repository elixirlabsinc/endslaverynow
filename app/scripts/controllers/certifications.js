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
				function(dataRepository) {
					// Get certification information
					$scope.certifications = dataRepository.getCertifications();

					$scope.loaded = true;
				});
		}]);
