'use strict'

/**
 * @ngdoc function
 * @name endslaverynowApp.controller:CertificationsCtrl
 * @description
 * # CertificationsCtrl
 * Controller of the endslaverynowApp
 */
angular.module('endslaverynowApp').controller('CertificationsCtrl', [
	'$firebaseObject',
	'$routeParams',
	'$scope',
	function($firebaseObject, $routeParams, $scope) {
		/* firebase */
		var ref = firebase.database().ref()
		var syncObject = $firebaseObject(ref)

		syncObject.$loaded().then(function() {
			// Get product information
			$scope.certifications = syncObject.certifications
			$scope.loaded = true
		})
	}
])
