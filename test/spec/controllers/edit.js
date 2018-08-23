'use strict';

describe('Controller: EditCtrl', function () {

    // load the controller's module
    beforeEach(module('endslaverynowApp'));

    var EditCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        EditCtrl = $controller('EditCtrl', {
            $scope: scope
            // place here mocked dependencies
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(EditCtrl.awesomeThings.length).toBe(3);
    });
});
