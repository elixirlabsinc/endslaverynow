'use strict';

xdescribe('Controller: RankingsCtrl', function () {

  // load the controller's module
  beforeEach(module('endslaverynowApp'));

  var RankingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RankingsCtrl = $controller('RankingsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RankingsCtrl.awesomeThings.length).toBe(3);
  });
});
