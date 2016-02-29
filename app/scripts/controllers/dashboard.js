'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('DashboardCtrl', function ($rootScope) {
    if (!Customer.isAuthenticated()) {
      $location.path('/login');
    } else {
      $rootScope.header = 'Dashboard';
      $rootScope.user = Customer.getCurrent();
    }
  });
