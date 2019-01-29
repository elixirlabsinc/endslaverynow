'use strict';

xdescribe('Controller: BrandCtrl', function () {

  // load the controller's module
  beforeEach(module('endslaverynowApp'));

  var BrandCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BrandCtrl = $controller('BrandCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BrandCtrl.awesomeThings.length).toBe(3);
  });
});
