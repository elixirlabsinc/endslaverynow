'use strict';

describe('Controller: FormAddCtrl', function () {

  // load the controller's module
  beforeEach(module('endslaverynowApp'));

  var FormAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormAddCtrl = $controller('FormAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FormAddCtrl.awesomeThings.length).toBe(3);
  });
});
