'use strict';

describe('Controller: PhotogalleryCtrl', function () {

  // load the controller's module
  beforeEach(module('loggrioApp'));

  var PhotogalleryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PhotogalleryCtrl = $controller('PhotogalleryCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PhotogalleryCtrl.awesomeThings.length).toBe(3);
  });
});
