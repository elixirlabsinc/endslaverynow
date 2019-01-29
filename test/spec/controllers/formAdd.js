'use strict';

describe('Controller: FormAddCtrl', function () {

  // load the controller's module
  beforeEach(module('endslaverynowApp'));

  var FormAddCtrl,
    scope,
    mockFirebaseObject;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new({formType: 'products'});
    mockFirebaseObject = function(databaseRef) {
      return {
        $loaded: function() { return { then: function() {} }},
        brands: undefined,
        categories: undefined,
        products: undefined
      }
    }
    FormAddCtrl = $controller('FormAddCtrl', {
      $scope: scope,
      $firebaseObject: mockFirebaseObject
    });
  }));

  describe('.processForm', function() {
    describe('adding products', function() {
      beforeEach(function() {
        scope.formType = 'products'
        scope.products = []
      })

      describe('when link does not start with http', function() {
        var item = {
          purchaseUrl: 'chocolate.com'
        }

        it('should prepend http:// to the link', function() {
          expect(item.purchaseUrl).toEqual('chocolate.com')

          scope.processForm(item)

          expect(item.purchaseUrl).toEqual('http://chocolate.com')
        })
      })

      describe('when link starts with http://', function() {
        var item = {
          purchaseUrl: 'http://chocolate.com'
        }

        it('should not prepend http to the link', function() {
          expect(item.purchaseUrl).toEqual('http://chocolate.com')

          scope.processForm(item)

          expect(item.purchaseUrl).toEqual('http://chocolate.com')
        })
      })

      describe('when link starts with https://', function() {
        var item = {
          purchaseUrl: 'https://chocolate.com'
        }

        it('should not prepend http to the link', function() {
          expect(item.purchaseUrl).toEqual('https://chocolate.com')

          scope.processForm(item)

          expect(item.purchaseUrl).toEqual('https://chocolate.com')
        })
      })
    })
  })
});
