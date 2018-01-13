'use strict';

describe('Controller: ProductCtrl', function () {

  // load the controller's module
  beforeEach(module('endslaverynowApp'));

  var ProductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductCtrl = $controller('ProductCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProductCtrl.awesomeThings.length).toBe(3);
  });
});
