'use strict';

describe('Controller: CertificationsCtrl', function () {

  // load the controller's module
  beforeEach(module('endslaverynowApp'));

  var CertificationsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CertificationsCtrl = $controller('CertificationsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CertificationsCtrl.awesomeThings.length).toBe(3);
  });
});
