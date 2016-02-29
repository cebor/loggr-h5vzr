'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:LivestreamCtrl
 * @description
 * # LivestreamCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('LivestreamCtrl', function ($rootScope, $location, Customer) {
    if (!Customer.isAuthenticated()) {
      $location.path('/login');
    } else {
      $rootScope.header = 'Livestream';
      $rootScope.user = Customer.getCurrent();
    }
  });
