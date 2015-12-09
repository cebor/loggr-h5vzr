'use strict';

describe('Controller: LivestreamCtrl', function () {

  // load the controller's module
  beforeEach(module('loggrioApp'));

  var LivestreamCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LivestreamCtrl = $controller('LivestreamCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LivestreamCtrl.awesomeThings.length).toBe(3);
  });
});
