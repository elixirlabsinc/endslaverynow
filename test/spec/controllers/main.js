'use strict';

xdescribe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('endslaverynowApp'));

  var MainCtrl,
    scope,
    mockFirebaseObject;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    mockFirebaseObject = function(databaseRef) {
      return {
        $loaded: function() { return { then: function() {} }}
      }
    }
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $firebaseObject: mockFirebaseObject
    });
  }));

  it('should have a list of categories', function () {
    expect(scope.categories).toBeDefined();
  });
});
